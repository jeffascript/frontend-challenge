console.log('Contentscript injected');

let element = document.createElement('div');
// const injectedText = document.createTextNode(`Extension`);
const img = document.createElement('img');
img.src = './images/favicon-16x16.png';
img.style = imgStyle();

const anotherText = document.createElement('span');

const style = `style`;

const Attribute = {
  STYLE: 'style',
  BLUE: 2,
  GREEN: 3,
  YELLOW: 4,
};
Object.freeze(Attribute);

const divStyle = () => {
  const divStyle = `
    float: right;
    display: flex;
    background: navy;
    margin: auto;
    padding: 0.5em 1em;
    border-radius: 0.3em;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
    color: white;
    cursor: pointer;
    transition: 0.3s;`;

  return divStyle.trim();
};

function imgStyle() {
  const imgStyle = `
      width: 1em;
      height: 1em;
      `;
  return imgStyle.trim();
}

const getContents = (args) => {
  return [...args].map((el) => el.textContent);
};

const budgetValue = document.querySelector(
  `div.makeStyles-app-1 div.makeStyles-root-2 div.makeStyles-mainPanel-3 div.makeStyles-scrollbars-5 div:nth-child(1) div.makeStyles-content-6 section:nth-child(1) > div:nth-child(3) > p:nth-child(3)`,
);

function getBudgetValue() {
  const wrapperDiv =
    'div.makeStyles-app-1 div.makeStyles-root-2 div.makeStyles-mainPanel-3 div.makeStyles-scrollbars-5 div:nth-child(1) div.makeStyles-content-6 section:nth-child(1) > div:nth-child(3)';

  const allPsUnderWrapperDiv = document.querySelectorAll(`${wrapperDiv} > p`);

  console.log(allPsUnderWrapperDiv);

  const allPContents = getContents(allPsUnderWrapperDiv);

  console.log(allPContents);

  const g =
    /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/; // this is the regex for currency symbols in unicode -> we used this because it is the most common currency symbol in unicode. We currently use this in our app.

  // return allPContents.find((el) => g.test(el)).trim();

  return allPContents.find((el) => g.test(el)).trim();

  //   let a = [...document.querySelectorAll("p")]
  // let r = a.map(i => i.textContent)

  // let g = /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/

  // let q = r.find(el => g.test(el))
}

const budgetText = getBudgetValue() ?? budgetValue.textContent.trim();

anotherText.textContent = `Budget-to-Beat: ${budgetText}`;

element.setAttribute(Attribute.STYLE, divStyle());
element.appendChild(img);
element.appendChild(anotherText);

const parentElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
);

parentElement.appendChild(element);

element.addEventListener('mouseenter', () => (element.style.background = '#6482f5'));

element.addEventListener('mouseleave', () => (element.style.background = 'navy'));
