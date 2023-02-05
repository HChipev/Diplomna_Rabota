<template>
  <div
    class="absolute pb-24 flex justify-center items-center min-w-[320px] w-full h-full bg-primery-lighter-color z-10 bg-opacity-75">
    <div
      class="flex rounded-lg bg-primery-lighter-color shadow-md shadow-white p-3">
      <div class="flex flex-col sm:min-w-[350px]">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold w-full mr-3">Change Personal Info</h1>
          <font-awesome-icon
            @click="closeModal"
            class="text-white text-2xl ml-3 hover:text-red-600 font-bold cursor-pointer"
            icon="fa-solid fa-times" />
        </div>
        <div class="flex flex-col">
          <label class="mt-2" for="firstName">First Name</label>
          <input
            v-model="firstName"
            type="text"
            id="firstName"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            :placeholder="user.firstName" />
        </div>
        <div class="flex flex-col">
          <label class="mt-2" for="lastName">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            id="lastName"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            :placeholder="user.lastName" />
        </div>
        <div class="flex flex-col">
          <label class="mt-2" for="phone">Phone</label>
          <input
            v-model="phone"
            type="tel"
            id="phone"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            :placeholder="user.phone" />
        </div>
        <div class="flex flex-col mt-3 justify-end items-center">
          <h3
            v-if="errorMessage"
            class="text-red-600 text-center mb-2 max-w-[245px] sm:max-w-[325px]">
            {{ errorMessage }}
          </h3>
          <h3
            v-if="successMessage"
            class="text-green-600 text-center mb-2 max-w-[245px] sm:max-w-[325px]">
            {{ successMessage }}
          </h3>
          <ReuseableButton
            type="submit"
            class="accent-button text-xl px-3 w-full text-nowrap"
            @click="handleSubmit">
            Save Changes
          </ReuseableButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Joi from "joi";
  const props = defineProps({
    user: Object,
  });
  const emits = defineEmits(["closeModal"]);
  const errorMessage = ref("");
  const successMessage = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const phone = ref("");
  const closeModal = () => {
    emits("closeModal");
  };
  const handleSubmit = async () => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).empty(""),
      lastName: Joi.string().min(3).empty(""),
      phone: Joi.string().min(10).max(10).empty(""),
    });
    const { error } = schema.validate({
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    });
    if (error) {
      errorMessage.value = error.details[0].message;
      return;
    }
    if (firstName.value === "" && lastName.value === "" && phone.value === "") {
      errorMessage.value = "Please fill at least one field";
      return;
    } else {
      errorMessage.value = "";
      const { error } = await useSupabaseClient()
        .from("User")
        .update({
          firstName: firstName.value ? firstName.value : props.user.firstName,
          lastName: lastName.value ? lastName.value : props.user.lastName,
          phone: phone.value ? phone.value : props.user.phone,
        })
        .match({ id: props.user.id });
      if (error) {
        errorMessage.value = error.message;
        return;
      }
    }
    successMessage.value = "Changes saved successfully";
    setTimeout(() => {
      closeModal();
    }, 1000);
  };
</script>
<style lang=""></style>
