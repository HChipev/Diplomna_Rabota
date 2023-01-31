<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full pb-16 2xl:w-3/5">
    <div class="border-t border-accent-color">
      <label for="message" class="block mb-2 mt-4 sm:text-2xl font-medium"
        >Your message</label
      >
      <div
        role="textarea"
        contenteditable
        class="block p-2.5 w-full text-lg min-h-[120px] bg-white text-black rounded-lg shadow-sm border border-border-color focus:ring-accent-color focus:border-accent-color"
        :placeholder="'Send ' + fullName + ' a message...'"></div>
      <ReuseableButton class="primery-button text-xl px-5 mt-4"
        >Send message</ReuseableButton
      >
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    carOwner: String,
  });
  const { data: user, error } = await useSupabaseClient()
    .from("User")
    .select("firstName,lastName")
    .eq("id", props.carOwner)
    .single();
  const fullName = user.firstName + " " + user.lastName;
  console.log(fullName);
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
