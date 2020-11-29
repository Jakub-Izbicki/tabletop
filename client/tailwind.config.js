module.exports = {
  theme: {
    extend: {
      height: {
        cardItem: `${5 * 0.88}em`,
        cardItemShadow: `${5 * 0.78}em`,
        cardItemHalf: `${2.5 * 0.88}em`,
        deckBase: `${5 * 0.2}em`,
        lifecounter: '1.5em',
        'previewFoundCardTop': '5rem',
        'previewFoundCardBot': '20rem',
        'previewFoundCard': '25rem',
      },
      width: {
        cardItem: `${5 * 0.63}em`,
        cardItemShadow: `${5 * 0.53}em`,
        lifecounter: '1.5em',
        'previewFoundCard': '20rem',
      },
      borderRadius: {
        cardItem: '0.25em',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
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
        deckInfo: '0.6em',
        itemHover: '0.2em',
        itemDrag: '0.4em',
        deckDrag: '2.5em',
        shadowCardHover: '1.7em',
        shadowCardDrag: '1.7em',
        subtitle: '1rem',
        lifecounterIconYOffset: '0.17em'
      },
      boxShadow: {
        hoverTarget: '0 0 0.1em 0.05em rgba(255,255,255,0.75)',
        hoverTargetNoBottom: '0 -0.1em 0.1em 0.05em rgba(255,255,255,0.75)',
        deck: '0em 0.8em 0.2em -0.2em rgb(0 0 0)',
        deckDrag: '0em 1em 0.7em -0.1em rgb(0 0 0)',
        card: '0em 0em 0.1em 0.25em rgb(0 0 0)',
        cardHover: '0em 0.0em 0.4em 0.1em rgb(0 0 0)',
        cardDrag: '0em 0em 0.8em 0.1em rgb(0 0 0)',
        // cardPreviewLight: '0px 5px 5px 5px rgba(255, 255, 255, 0.005)',
        'xl': '0 5px 10px -3px rgba(0, 0, 0, 1)',
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      },
      fontSize: {
        '2xs': '.60rem',
        cardBackLabel: '2em',
        deckEmptyCard: '0.3em',
        title: '1.8rem',
        titleLetter: '4rem',
        subtitle: '1.5rem',
        lifecounterIcon: '1.5em',
        lifecounterHP: '1em',
        cardInfo: '0.5em',
        cardInfoKeyboard: '2em',
      },
      zIndex: {
        'onTop': '999'
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow',
        'transform-shadow-opacity': 'transform, box-shadow, opacity',
      },
      fontFamily: {
        'wizard': ['WizardFont', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'thin': ['ThinFont', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'keyboard': ['KeyboardFont', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      inset: {
        1: '100%'
      },
      padding: {
        cardInfo: '0.2em',
        deckImporterFlexbox: '17rem'
      },
      margin: {
        titleLetter: '-1.7rem',
        cardInfoKeyboard: '-0.3em',
      },
      opacity: {
        95: '0.95'
      }
    },
  },
  variants: {
    opacity: ['group-hover'],
    // extend: {
    //   zIndex: ['hover', 'odd']
    // }
    // overflow: ['hover'],
    // height: ['last']
  },
  plugins: [],
};
