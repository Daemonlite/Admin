

async function useSearchData(data, term, url='', keysToSearch=null) {    
  if (data.length > 0) {
    const searchResults = data.filter((obj) => {
      const valuesToSearch = keysToSearch
        ? keysToSearch.map((key) => obj[key])
        : Object.values(obj);

      return valuesToSearch.some((valueToSearch) => {
        const isString = typeof valueToSearch === 'string';
        const isInt = typeof valueToSearch === 'number' && Number.isInteger(valueToSearch);
        if ((isString && typeof term === 'string')) {
          const content = isString ? valueToSearch.toLowerCase() : valueToSearch;          
          return content.includes(term);
        }
        if ((isInt && typeof term === 'number' && Number.isInteger(term))) {
          const content = isString ? valueToSearch.toLowerCase() : valueToSearch;          
          return content == term;
        }
        return false;
      });
    });

    return searchResults;
  }else{
    let urlFetch =  url
    let pagedResult = await useFetchData(
      urlFetch + "?search=" + term
    );
    return pagedResult.data[0].results
  }

  }

  export default useSearchData
