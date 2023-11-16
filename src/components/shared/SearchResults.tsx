import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
  isSearchFetching: boolean;
  searchPosts?: unknown;
};
const SearchResults = ({
  isSearchFetching,
  searchPosts,
}: SearchResultProps) => {
  if (!isSearchFetching) return <Loader />;

  if (searchPosts && searchPosts?.documents.length > 0)
    return <GridPostList posts={searchPosts?.documents} />;

  return (
    <p className="text-light-4 mt-10 text-center w-full">
      Post Not Found Sorry
    </p>
  );
};

export default SearchResults;
