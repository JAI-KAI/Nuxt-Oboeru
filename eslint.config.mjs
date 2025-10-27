// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'never' }, // 明確要求空元素不自閉合
      },
    ],
    'vue/html-indent': ['error', 2],
  },
})
