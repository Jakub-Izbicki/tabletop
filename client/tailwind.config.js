module.exports = {
  theme: {
    extend: {
      height: {
        cardItem: `${5 * 0.88}em`,
        cardItemShadow: `${5 * 0.78}em`,
        cardItemHalf: `${2.5 * 0.88}em`,
        deckBase: `${5 * 0.2}em`,
        lifecounter: '1.5em',
      },
      width: {
        cardItem: `${5 * 0.63}em`,
        cardItemShadow: `${5 * 0.53}em`,
        lifecounter: '1.5em',
      },
      borderRadius: {
        cardItem: '0.25em',
      },
      borderWidth: {
        cardBack: '.1em',
        deckEmpty: '.01em',
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
        deckInfo: '2.6em',
        itemHover: '0.2em',
        itemDrag: '0.4em',
        shadowCardHover: '1.7em',
        shadowCardDrag: '1.7em',
        subtitle: '0.75rem',
        lifecounterIconYOffset: '0.17em'
      },
      boxShadow: {
        hoverTarget: '0 0 0.1em 0.05em rgba(255,255,255,0.75)',
        hoverTargetNoBottom: '0 -0.1em 0.1em 0.05em rgba(255,255,255,0.75)',
        deck: '0em 0.8em 0.2em -0.2em rgb(0 0 0)',
        card: '0em 0em 0.1em 0.25em rgb(0 0 0)',
        cardHover: '0em 0.0em 0.4em 0.1em rgb(0 0 0)',
        cardDrag: '0em 0em 0.8em 0.1em rgb(0 0 0)'
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      },
      fontSize: {
        '2xs': '.60rem',
        cardBackLabel: '2em',
        deckEmptyCard: '0.3em',
        title: '2rem',
        titleLetter: '4rem',
        subtitle: '1.5rem',
        lifecounterIcon: '1.5em',
        lifecounterHP: '1em',
        deckInfo: '0.6em'
      },
      zIndex: {
        'onTop': '999'
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow',
      },
      fontFamily: {
        'wizard': ['WizardFont', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      inset: {
        1: '100%'
      },
      padding: {
        deckInfo: '0.2em'
      }
    },
  },
  variants: {
    opacity: ['group-hover']
  },
  plugins: [],
};
