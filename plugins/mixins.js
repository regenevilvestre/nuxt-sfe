import _ from 'lodash'

export default {
  methods: {
    textLimit (title, limit = 50) {
      if (title.length > limit) {
        return title.substring(0, (limit - 3)) + '...'
      } else {
        return title
      }
    },
    empty (value) {
      return _.isEmpty(value)
    },
    isString (value) {
      return _.isString(value)
    },
    showPlaceholder (image, background = true) {
      const noImage = require('../static/images/no-image.jpg')
      const placeholder = { backgroundImage: `url(${noImage})` }

      switch (background) {
        case true: {
          if (_.isNull(image) || _.isEmpty(image) || image === '') {
            return placeholder
          } else {
            return { backgroundImage: `url(${image})` }
          }
        }
        default: {
          if (_.isNull(image)) {
            return noImage
          } else {
            return image
          }
        }
      }
    }
  }
}
