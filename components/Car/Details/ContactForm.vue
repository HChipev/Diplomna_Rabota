<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full pb-16 2xl:w-3/5">
    <div :class="disabled ? 'relative p-3' : 'border-t border-accent-color'">
      <div
        v-if="disabled"
        class="absolute bg-gray-500 opacity-80 rounded-md top-0 left-0 w-full h-full text-2xl text-accent-color flex justify-center items-center">
        Register to send messages!
      </div>
      <label
        for="message"
        :class="disabled ? 'noSelect' : ''"
        class="block mb-2 mt-4 sm:text-2xl font-medium"
        >Your message</label
      >
      <div
        @input="message = $event.target.innerText"
        role="textarea"
        :contenteditable="!disabled"
        :class="disabled ? 'noSelect' : ''"
        class="block p-2.5 w-full text-lg min-h-[120px] bg-white text-black rounded-lg shadow-sm border border-color focus:ring-accent-color focus:border-accent-color"
        :placeholder="'Send ' + fullName + ' a message...'">
        {{ message }}
      </div>
      <div :class="errorMessage ? 'text-red-600' : 'text-green-600'">
        {{ errorMessage ? errorMessage : successMessage }}
      </div>
      <ReuseableButton
        @click="onSubmit"
        :disabled="disableButton"
        :class="
          (disableButton
            ? 'disabled hover:shadow-none bg-gray-500  border-gray-500'
            : 'primery-button',
          disabled
            ? 'noSelect disabled hover:shadow-none bg-gray-500  border-gray-500'
            : 'primery-button')
        "
        class="text-xl px-5 mt-4"
        >Send message</ReuseableButton
      >
    </div>
    <!-- <div v-else class="relative">
       
        <label for="message" class="block mb-2 mt-4 sm:text-2xl font-medium"
          >Your message</label
        >
      </div>
    </div> -->
  </div>
</template>
<script setup>
  const props = defineProps({
    carOwner: String,
    disabled: Boolean,
  });
  const message = ref("");
  const errorMessage = ref("");
  const successMessage = ref("");
  const disableButton = computed(() => {
    if (message.value.length > 0) {
      return false;
    } else {
      return true;
    }
  });
  const { data: user } = await useSupabaseClient()
    .from("User")
    .select("firstName,lastName")
    .eq("id", props.carOwner)
    .single();
  const fullName = user.firstName + " " + user.lastName;

  async function onSubmit() {
    try {
      const { data } = await useSupabaseClient()
        .from("User")
        .select("firstName,lastName,phone,email")
        .eq("id", useSupabaseUser().value.id)
        .single();
      const name = data.firstName + " " + data.lastName;
      const email = data.email;
      const phone = data.phone;
      await $fetch(`/api/car/listings/${useRoute().params.id}/message`, {
        method: "POST",
        body: {
          message: message.value,
          email: email,
          name: name,
          phone: phone,
        },
      }).then((res) => {
        if (res.statusCode === 412) {
          errorMessage.value = res.body.message;
          successMessage.value = "";
        } else {
          message.value = "";
          errorMessage.value = "";
          successMessage.value = "Message sent!";
        }
      });
    } catch (err) {
      errorMessage.value = err.statusMessage;
      successMessage.value = "";
    }
  }
</script>
<style lang="scss">
  [contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: rgb(122, 122, 122);
    background-color: transparent;
  }
  [contenteditable] {
    outline: 0;
  }
</style>
