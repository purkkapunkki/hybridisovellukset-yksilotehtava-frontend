import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi, type MockedFunction} from 'vitest';
import '@testing-library/jest-dom';
import Upload from '../views/Upload';
import {normalizeTagNames, validateForm} from '../utils/uploadHelpers';

// we will mock the hooks that perform API calls so we can inspect them
vi.mock('../hooks/apiHooks', () => ({
  useFile: vi.fn(),
  useMedia: vi.fn(),
  useTags: vi.fn(),
}));

import {useFile, useMedia, useTags} from '../hooks/apiHooks';

// TODO: fix this test
test('renders headline', () => {
  render(<Upload />);
  const header = screen.getByRole('heading', {level: 1});
  expect(header).toHaveTextContent('Upload');
});

// helper tests for normalization and form validation
describe('tag utilities', () => {
  test('normalizeTags parses and filters input correctly', () => {
    const input =
      '  Foo,bar,B , ,TooLongTag______________________________________________ ,okay ';
    const normalized = normalizeTagNames(input);
    // 'B' is too short and should be filtered out; long tag also removed
    expect(normalized).toEqual(['foo', 'bar', 'okay']);
  });

  test('validateForm returns false when missing file/title/tags', () => {
    const dummy = new File([''], 'a.png', {type: 'image/png'});
    expect(validateForm(null, 'abcd', 'tag')).toBe(false);
    expect(validateForm(dummy, 'a', 'tag')).toBe(false);
    expect(validateForm(dummy, 'abcd', '')).toBe(false);
    expect(validateForm(dummy, 'abcd', '  ,  ')).toBe(false);
  });

  test('validateForm returns true for valid input', () => {
    const dummy = new File([''], 'a.png', {type: 'image/png'});
    expect(validateForm(dummy, 'title', 'tag1, tag2')).toBe(true);
  });
});

// TODO: fix this test
// integration-style test for upload process
test('uploading triggers tag API calls for normalized tags', async () => {
  const mockPostFile = vi.fn().mockResolvedValue({data: {file_id: 123}});
  const mockPostMedia = vi.fn().mockResolvedValue({media: {media_id: 456}});
  const mockPostTag = vi.fn().mockResolvedValue({message: 'ok'});

  const mockedUseFile = useFile as unknown as MockedFunction<typeof useFile>;
  const mockedUseMedia = useMedia as unknown as MockedFunction<typeof useMedia>;
  const mockedUseTags = useTags as unknown as MockedFunction<typeof useTags>;
  mockedUseFile.mockReturnValue({postFile: mockPostFile});
  mockedUseMedia.mockReturnValue({mediaArray: [], postMedia: mockPostMedia});
  mockedUseTags.mockReturnValue({
    postTag: mockPostTag,
    tags: [],
    loading: false,
    error: null,
  });

  render(<Upload />);

  const fileInput = screen.getByLabelText('File') as HTMLInputElement;
  const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
  const tagsInput = screen.getByLabelText('Tags') as HTMLInputElement;
  const btn = screen.getByRole('button', {name: /upload/i});

  // simulate filling the form
  const dummyFile = new File(['foo'], 'foo.png', {type: 'image/png'});
  fireEvent.change(fileInput, {target: {files: [dummyFile]}});
  fireEvent.change(titleInput, {target: {value: 'my title'}});
  fireEvent.change(tagsInput, {
    target: {value: 'tagA, TagB, bad, a,   '},
  });

  // button should become enabled after valid inputs
  expect(btn).not.toBeDisabled();

  fireEvent.click(btn);

  // wait for async actions to complete
  await waitFor(() => {
    expect(mockPostFile).toHaveBeenCalled();
    expect(mockPostMedia).toHaveBeenCalled();
    // only valid tags length >=2 <=50 should remain: tagA, TagB, bad
    expect(mockPostTag).toHaveBeenCalledTimes(3);
    expect(mockPostTag).toHaveBeenCalledWith('taga', 456, expect.any(String));
  });
});
