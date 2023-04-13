//Check if string contains links

export default function parseDescription(description) {
  const words = description.split(' ');
  let result = '';
  words.forEach((word) => {
    //If "word" is actually a link, attach an <a> tag
    if (word.match(/(https?:\/\/[^\s]+)/g)) {
      result += `<a href=${word} target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${word}</a> `;
    } else {
      result += `${word} `;
    }
  });
  return result.trim();
}
