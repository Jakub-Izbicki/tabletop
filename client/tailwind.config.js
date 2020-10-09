module.exports = {
  theme: {
    extend: {
      height: {
        cardItem: `${5 * 0.88}em`,
        cardItemHalf: `${2.5 * 0.88}em`,
        deckBase: `${5 * 0.2}em`,
      },
      width: {
        cardItem: `${5 * 0.63}em`,
      },
      borderRadius: {
        cardItem: '0.25em',
      },
      borderWidth: {
        cardBack: '.1em',
      },
      rotate: {
        '0': '0deg',
        '90': '90deg',
        '180': '180deg',
        '270': '270deg',
      },
      spacing: {
        '1.5em': '1.5em',
        deckBase: '0.7em',
        itemHover: '0.2em'
      },
      boxShadow: {
        hoverTarget: '0 0 0.1em 0.05em rgba(255,255,255,0.75)',
        hoverTargetNoBottom: '0 -0.1em 0.1em 0.05em rgba(255,255,255,0.75)',
        deck: '0em 0.5em 0.5em 0em rgb(0 0 0)'
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      },
      fontSize: {
        '2xs': '.60rem',
        cardBackLabel: '.5em'
      },
      zIndex: {
        'onTop': '999'
      }
    },
  },
  variants: {},
  plugins: [],
};
