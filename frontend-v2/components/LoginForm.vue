<script setup>
import { useForm } from "vee-validate";
import InputField from "./Form/InputField.vue";

const { handleSubmit } = useForm({
  validationSchema: loginScehma,
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    // Reset the form and the field values to their initial values
    actions.resetForm();

    const data = await $fetch(loginRoute, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data) {
      // Extract Token from response
      const token = data.token;

      // Set Token as a cookie
      const cookie = useCookie("token", token, {
        maxAge: 300,
        path: "/",
        secure: true,
      });

      cookie.value = token;

      console.log("Token set successfully: ");
      navigateTo('/library');
    } else {
      console.error("Login Failed!", data.getResponseStatusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
  })
</script>

<template>
  <form @submit="onSubmit">
    <div class="join join-vertical">
      <!-- Username Field -->
      <div class="join-item py-1">
        <InputField
          name="username"
          labelName="Username"
          placeholder="Enter a username"
        />
      </div>

      <!-- Password Field -->
      <div class="join-item py-1">
        <InputField
          name="password"
          type="password"
          labelName="Password:"
          placeholder="Enter a Password"
        />
      </div>

      <!-- Submit Button -->
      <div class="py-5">
        <button type="submit" class="btn btn-success btn-wide">Login</button>
      </div>
    </div>
  </form>
</template>
