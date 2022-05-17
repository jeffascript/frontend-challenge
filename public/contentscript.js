console.log('Contentscript injected');

// initialise in variables and enums

const SelectorsEnum = {
  PARENT: `#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2`,
  DIV_WRAPPER: `div.makeStyles-app-1 div.makeStyles-root-2 div.makeStyles-mainPanel-3 div.makeStyles-scrollbars-5 div:nth-child(1) div.makeStyles-content-6 section:nth-child(1) > div:nth-child(3)`,
  BUDGET_VALUE: `div.makeStyles-app-1 div.makeStyles-root-2 div.makeStyles-mainPanel-3 div.makeStyles-scrollbars-5 div:nth-child(1) div.makeStyles-content-6 section:nth-child(1) > div:nth-child(3) > p:nth-child(3)`,
  DIV: 'div',
  IMG: 'img',
  SPAN: 'span',
};
Object.freeze(SelectorsEnum);

const iconSrc = './images/favicon-16x16.png';

const navyColor = '#001f3f';

const lightNavyColor = '#6482f5';

// create the styles for the elements

const style = 'style';

const divStyle = () => {
  const divStyle = `
      float: right;
      display: flex;
      background: ${navyColor};
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

// create the button

let btn = document.createElement(SelectorsEnum.DIV);
btn.setAttribute(style, divStyle());

// create the img & span

const img = document.createElement(SelectorsEnum.IMG);
img.src = iconSrc;
img.style = imgStyle();

const budgetSpan = document.createElement(SelectorsEnum.SPAN);

//helper to map and return only textContents
const getContents = (args) => {
  return [...args].map((el) => el.textContent);
};

// the known location of the budget value
const budgetValue = document.querySelector(SelectorsEnum.BUDGET_VALUE);

// dynamically generate the budget Value under the div wrapper: P's under the Div wrapper
function dynamicallyGeneratedBudgetValue() {
  const wrapperDiv = SelectorsEnum.DIV_WRAPPER;
  const allPsUnderWrapperDiv = document.querySelectorAll(`${wrapperDiv} > p`);
  const allPContents = getContents(allPsUnderWrapperDiv);

  // this is the regex for currency symbols in unicode -> we used this because it is the most common currency symbol in unicode. We currently use this in our app.
  const hasACurrencySymbol =
    /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;

  return allPContents.find((el) => hasACurrencySymbol.test(el)).trim();
}

// we need to dynamically get the budget value from the DOM or use the selected value when former is undefined
const budgetText = dynamicallyGeneratedBudgetValue() ?? budgetValue.textContent.trim();

// add the text to the span
budgetSpan.textContent = `Budget-to-Beat: ${budgetText}`;

// append the img and span to the button
btn.appendChild(img);
btn.appendChild(budgetSpan);

const parentElement = document.querySelector(SelectorsEnum.PARENT);

// append the btn to the parent element
parentElement.appendChild(btn);

// add the event listener to the button on Hover
btn.addEventListener('mouseenter', () => (btn.style.background = lightNavyColor));

btn.addEventListener('mouseleave', () => (btn.style.background = navyColor));
