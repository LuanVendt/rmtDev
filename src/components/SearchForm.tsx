export default function SearchForm({ searchText, setSearchText }) {
  // const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(e.target.value);
  //   const response = await fetch(
  //     "https://bytegrad.com/course-assets/projects/rmtdev/api/data"
  //   );

  //   if (!response.ok) {
  //     console.error("Failed to fetch data");
  //     return;
  //   }

  //   const data = await response.json();

  //   console.log(data.jobItems.length);
  // };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
