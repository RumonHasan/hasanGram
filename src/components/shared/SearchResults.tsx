import Loader from './Loader';
import GridPostList from './GridPostList';
import { Models } from 'appwrite';

type SearchResultProps = {
  isSearchFetching: boolean;
  searchPosts: Models.Document[] | Models.Document | undefined;
};
const SearchResults = ({
  isSearchFetching,
  searchPosts,
}: SearchResultProps) => {
  if (!isSearchFetching) return <Loader />;

  if (searchPosts) {
    if (Array.isArray(searchPosts) && searchPosts.length > 0) {
      return <GridPostList posts={searchPosts} />;
    } else if (
      !Array.isArray(searchPosts) &&
      searchPosts.documents.length > 0
    ) {
      return <GridPostList posts={[searchPosts]} />;
    }
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">
      Post Not Found Sorry
    </p>
  );
};

export default SearchResults;
