<script setup>
import { useForm } from 'vee-validate';
import InputField from './Form/InputField.vue';

const { handleSubmit } = useForm({
    validationSchema: loginScehma,
});


const onSubmit = handleSubmit(async (values, actions) => {

    console.log(values); // Send data to API
    
    // Reset the form and the field values to their initial values
    actions.resetForm();

    // const serverResponse = await loginUser(values);

    // console.log(serverResponse);

});


</script>

<template>
    <form @submit="onSubmit">
        <div class="join join-vertical">

            <!-- Username Field -->
            <div class="join-item py-1">
               <InputField name="username" labelName="Username" placeholder="Enter a username"/>
             </div>
             
             <!-- Password Field -->
            <div class="join-item py-1">
               <InputField name="password" type="password" labelName="Password:" placeholder="Enter a Password" />
             </div>


            <!-- Submit Button -->
            <div class="py-5">
                <button type="submit" class="btn btn-success btn-wide">Create Account</button>
            </div>

        </div>
    </form>
</template>