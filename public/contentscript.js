console.log('Contentscript injected');

const parentSelectorRef = `#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2`;

const budgetValueSelectorRef = `#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p:nth-child(3)`;

const primaryColor = '#001f3f';

const secondaryColor = '#6482f5';

const iconSrc = './images/favicon-16x16.png';

const btnStyle = {
  float: 'right',
  display: 'flex',
  background: `${primaryColor}`,
  margin: 'auto',
  padding: '0.5em 1em',
  'border-radius': '0.3em',
  'justify-content': 'space-between',
  'align-items': 'center',
  'column-gap': '20px',
  color: 'white',
  cursor: 'pointer',
  transition: '0.3s',
};

const styleElementWithCss = (el, style) => {
  for (const property in style) {
    el.style[property] = style[property];
  }
};

const btnElement = document.createElement('div');

const budgetText = document.querySelector(budgetValueSelectorRef).textContent.trim();

styleElementWithCss(btnElement, btnStyle);

const budgetImgEl = document.createElement('img');
budgetImgEl.src = iconSrc;
budgetImgEl.style.width = '1em';
budgetImgEl.style.height = 'auto';

const budgetValueEl = document.createElement('span');
budgetValueEl.textContent = `Budget-to-Beat: ${budgetText}`;

btnElement.appendChild(budgetImgEl);
btnElement.appendChild(budgetValueEl);

const parentElement = document.querySelector(parentSelectorRef);

parentElement.appendChild(btnElement);

btnElement.addEventListener('mouseenter', () => (btnElement.style.background = secondaryColor));

btnElement.addEventListener('mouseleave', () => (btnElement.style.background = primaryColor));
