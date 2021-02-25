<template>
  <form
    action="/"
    novalidate
    class="form form--register"
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
          @blur="$v.form.password.$touch()"
        />
      </div>

      <div class="form__block">
        <PasswordConfirm
          v-model.trim="$v.form.passwordConfirm.$model"
          :field="'passwordConfirm'"
          :modifier="formModifier($v.form.passwordConfirm)"
          type="password"
          label="Password"
          @blur="$v.form.passwordConfirm.$touch()"
        />
      </div>

      <div class="form__block">
        <Button
          text="REGISTER"
          modifier="btn--fluid"
          @click.native="submit($event)"
        />
      </div>
    </div>

    <div class="form__action form__action--register">
      <p class="form__message">
        Already have an account? <strong @click="$emit('toggle')">LOGIN HERE</strong>
      </p>
      <p
        v-if="invalid"
        class="form__message form__message--register form__message--error"
      >
        Invalid/email is already taken.<br>
        Please try again
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, sameAs } from 'vuelidate/lib/validators'
import { AUTHENTICATE, REGISTER } from '@/graphql'
import Button from '@/components/Button'
import Input from '@/components/Input'

export default {
  name: 'RegisterForm',
  components: {
    Button,
    EmailInput: Input,
    PasswordInput: Input,
    PasswordConfirm: Input
  },
  data () {
    return {
      invalid: false,
      errors: [],
      form: {
        email: '',
        password: '',
        passwordConfirm: ''
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
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password')
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
    login (credentials) {
      this.$apollo.mutate({
        mutation: AUTHENTICATE,
        variables: { ...credentials }
      })
        .then((res) => {
          if (res.data.authenticate !== '') {
            this.$store.commit('login', res.data.authenticate)
            this.$emit('close')
          }
        })
        .catch((err) => {
          this.$logger(err)
        })
    },
    handleError (err) {
      this.invalid = true
      this.errors.push(err.message)

      setTimeout(() => {
        this.invalid = false
      }, 3000)
    },
    submit (e) {
      e.preventDefault()

      if (!this.$v.$invalid) {
        this.$apollo.mutate({
          mutation: REGISTER,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        })
          .then((res) => {
            if (res.data.register) {
              this.login({
                email: this.form.email,
                password: this.form.password
              })
            }
          })
          .catch((err) => {
            this.handleError(err)
          })
      }
    }
  }
}
</script>
