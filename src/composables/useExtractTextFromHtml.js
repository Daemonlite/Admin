

function useExtractTextFromHtml(htmlContent) {
  
  const div = document.createElement("div");
  div.innerHTML = htmlContent;

  // Extract and return the text content
  return div.textContent || div.innerText;
  }

export default useExtractTextFromHtml
