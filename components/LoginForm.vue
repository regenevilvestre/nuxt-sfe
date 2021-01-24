<template>
  <form
    action="/"
    novalidate
    class="form form--login"
    @submit.prevent="submit($event)"
  >
    <div class="form__inner">
      <div class="form__block">
        <EmailInput
          v-model="$v.form.email.$model"
          :field="'email'"
          :modifier="formModifier($v.form.email)"
          type="email"
          label="Email"
          @blur="$v.form.email.$touch()"
        />
      </div>

      <div class="form__block">
        <PasswordInput
          v-model.trim="$v.form.password.$model"
          :field="'password'"
          :modifier="formModifier($v.form.password)"
          type="password"
          label="Password"
          @enter="enter($event)"
          @blur="$v.form.password.$touch()"
        />
      </div>

      <div class="form__block">
        <Button
          text="LOGIN"
          modifier="btn--fluid"
          @click.native="submit($event)"
        />
      </div>
    </div>

    <div class="form__action form__action--login">
      <p class="form__message">
        No account yet? <strong @click="$emit('toggle')">REGISTER HERE</strong>
      </p>
      <p
        v-if="invalid"
        class="form__message form__message--error"
      >
        Email/Password is invalid.<br>
        Please try again
      </p>
    </div>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { AUTHENTICATE } from '../graphql'
import Button from './Button'
import Input from './Input'

export default {
  name: 'LoginForm',
  components: {
    Button,
    EmailInput: Input,
    PasswordInput: Input
  },
  data () {
    return {
      invalid: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    getForm () { return this.form }
  },
  methods: {
    formModifier (validation) {
      if (validation.$error) {
        return 'input--error'
      } else if (validation.$dirty) {
        return 'input--dirty'
      }
    },
    enter (e) {
      if (e.target.value.trim() !== '') {
        this.submit(e)
      }
    },
    submit (e) {
      e.preventDefault()

      if (!this.$v.$invalid) {
        this.$apollo.mutate({
          mutation: AUTHENTICATE,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        })
          .then((res) => {
            if (res.data.authenticate !== '') {
              this.$store.commit('login', res.data.authenticate)
              this.$emit('close')
              this.invalid = false
            } else {
              this.invalid = true
              setTimeout(() => {
                this.invalid = false
              }, 3000)
            }
          })
          .catch((err) => {
            this.$logger(err)
          })
      }
    }
  }
}
</script>
