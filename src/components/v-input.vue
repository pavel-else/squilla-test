<docs>
  <v-input 
    class="input" 
    type="email"
    minLength="5"
    placeholder="email" 
    v-model="email"
    @valid="isValidEmail = $event" 
  />
</docs>
<template>

<div class="v-input">
  <span class="v-input__valid">{{ validText }}</span>
  <input :class="inClass" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)"/>
</div>

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'string', // string || number || email || natural
    },
    inClass: String,
    value: [String, Number],
    placeholder: String,

    
    minLength: {
      type: [String, Number],
      default: 0,
    },

    maxLength: {
      type: [String, Number],
      default: +Infinity,      
    },
    
    minValue: {
      type: [String, Number],
      default: -Infinity,
    },    
    maxValue: {
      type: [String, Number],
      default: +Infinity,
    },
  },
  data() {
    return {
      validText: '',
    };
  },
  watch: {
    value(v) {
      if (this.type === 'natural') {
        if (Number.isNaN(+v) || +v < 1 || +v % 1 !== 0) {
          this.validText = 'invalid value';
          this.$emit('valid', false);
          return;
        }
      }

      if (this.type === 'email') {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!re.test(v)) {
          this.validText = 'invalid email';
          this.$emit('valid', false);
          return;
        }
      }

      if (v.length === 0) {
        this.$emit('valid', false);
        return;
      }
      
      if (v.length < this.minLength) {
        this.validText = 'minimal length -' + this.minLength;
        this.$emit('valid', false);
        return;
      }
      if (v.length > this.maxLength) {
        this.validText = 'maximal length -' + this.maxLength;
        this.$emit('valid', false);
        return;
      }

      if (+v > this.maxValue) {
        this.validText = 'maximal value -' + this.maxValue;
        this.$emit('valid', false);
        return;
      }

      if (+v < this.minValue) {
        this.validText = 'minimal value -' + this.minValue;
        this.$emit('valid', false);
        return;
      }


      this.validText = '';
      this.$emit('valid', true);
    },
  },
}
</script>

<style>
.v-input {
  position: relative;
  display: flex;
}

.v-input__valid {
  position: absolute;
  top: -16px;
  left: 0;
  color: #fe6d3e;
  font-size: 11px;
  font-weight: 500;
}
</style>
