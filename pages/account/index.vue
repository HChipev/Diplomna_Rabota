<template>
  <div class="relative">
    <ChangeNameModal
      @closeModal="isModalOpen = false"
      :user="user"
      v-if="isModalOpen" />
    <div
      v-if="user"
      class="flex gap-12 justify-center items-center mx-2 sm:mx-12 lg:mx-28 max-w-full"
      :class="isModalOpen ? 'noSelect' : ''">
      <div class="relative flex sm:p-5 w-full h-full rounded-md">
        <div
          class="flex flex-col rounded-xl shadow-sm shadow-white overflow-hidden w-full">
          <div class="relative w-full h-24 sm:h-32 md:h-40">
            <img
              class="w-full h-full object-cover"
              :src="
                user.bgImage
                  ? `${entry}/storage/v1/object/public/images/${user.bgImage}`
                  : defaultBackgroundPic
              "
              alt="gradient-image" />
            <div
              class="absolute transition-all duration-500 bg-black opacity-0 hover:opacity-75 top-0 w-full h-full rounded-t-lg flex flex-col justify-center items-center">
              <font-awesome-icon
                class="text-xl sm:text-3xl text-white"
                icon="fa-solid fa-camera" />
              <h1 class="text-white text-sm sm:text-lg">Change Background</h1>
              <input
                type="file"
                class="opacity-0 absolute cursor-pointer w-full h-full top-0 rounded-t-lg"
                accept="image/*"
                @change="onBgImageUpload" />
            </div>
          </div>

          <div
            class="absolute top-20 sm:top-28 left-3 sm:left-9 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 bg-black rounded-full">
            <img
              class="object-cover w-full h-full rounded-full"
              :src="
                user.image
                  ? `${entry}/storage/v1/object/public/images/${user.image}`
                  : defaultProfilePic
              "
              alt="profile-pic" />

            <div
              class="absolute transition-all duration-500 bg-black opacity-0 hover:opacity-75 top-0 w-full h-full rounded-full flex flex-col justify-center items-center">
              <font-awesome-icon
                class="text-xl sm:text-3xl text-white"
                icon="fa-solid fa-camera" />
              <h1 class="text-white text-sm sm:text-lg">Change</h1>
              <input
                type="file"
                class="opacity-0 absolute cursor-pointer w-full h-full top-0 rounded-full"
                accept="image/*"
                @change="onImageUpload" />
            </div>
          </div>
          <div
            class="w-fill h-auto py-2 mb-2 pl-20 sm:pl-32 md:pl-44 bg-primery-darker-color">
            <div class="flex justify-between">
              <div class="flex flex-col whitespace-nowrap">
                <h1 class="text-lg md:text-2xl font-semibold text-white">
                  {{ user.firstName + " " + user.lastName }}
                </h1>
                <h1 class="text-xs md:text-base text-text-muted-color">
                  {{ user.email }}
                </h1>
                <h1 class="text-xs md:text-base text-accent-color font-medium">
                  {{ user.phone }}
                </h1>
                <ReuseableButton
                  class="text-xs sm:text-base mt-2 primery-button hover:shadow-sm hover:shadow-white"
                  @click="isModalOpen = true">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                  Edit Profile
                </ReuseableButton>
                <NuxtLink
                  to="/account/sent-messages"
                  class="text-xs sm:text-base mt-2 primery-button hover:shadow-sm hover:shadow-white text-center">
                  <font-awesome-icon icon="fa-solid fa-message" />
                  Sent Messages
                </NuxtLink>
                <ReuseableButton
                  class="text-xs sm:text-base mt-2 primery-button hover:shadow-sm hover:shadow-white"
                  @click="logout">
                  Sign Out
                </ReuseableButton>
              </div>
              <div class="flex mt-1 ml-6 mr-2 sm:mr-8">
                <h1 class="text-xs md:text-base text-text-muted-color">
                  <span class="text-accent-color font-medium text-sm md:text-lg"
                    >Joined on:</span
                  >
                  <br />
                  {{
                    user.createdAt.split("T")[0] +
                    " " +
                    user.createdAt.split("T")[1].split(".")[0]
                  }}
                </h1>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col rounded-lg px-0 sm:px-3 pt-3 pb-1 sm:pb-3 m-1 sm:m-4 shadow-sm shadow-white">
            <h1 class="text-lg sm:text-2xl text-center">Saved Listings</h1>
            <div v-if="savedCars !== undefined">
              <h1
                class="text-base sm:text-lg mt-2 ml-1 sm:ml-6"
                :class="
                  savedCars.length > 0 || !savedCars === undefined
                    ? '-mb-2'
                    : ''
                ">
                Saved Cars
              </h1>

              <h1
                v-if="savedCars.length <= 0 || savedCars === undefined"
                class="text-lg text-center border border-border-color rounded-lg">
                No saved cars.
              </h1>
              <OneColumnGridAccount v-else :cars="savedCars" />
            </div>
            <!--//* ---------------------Parts------------------------------ -->
            <div v-if="savedParts !== undefined">
              <h1
                class="text-base sm:text-lg mt-2 ml-1 sm:ml-6"
                :class="savedParts.length > 0 ? '-mb-2' : ''">
                Saved Parts
              </h1>

              <h1
                v-if="savedParts.length <= 0"
                class="text-lg text-center border border-border-color rounded-lg">
                No saved parts.
              </h1>
              <OneColumnGridAccount v-else :parts="savedParts" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
<script setup>
  import { v4 as uuidv4 } from "uuid";
  import defaultProfilePic from "~/assets/profile-pic-icon.png";
  import defaultBackgroundPic from "~/assets/account-background.svg";
  const entry = useRuntimeConfig().public.supabase.url;
  const isModalOpen = ref(false);
  useHead({
    title: "My Account",
    meta: [
      {
        name: "description",
        content: "Account page",
      },
    ],
  });
  definePageMeta({
    middleware: ["auth-middleware"],
  });
  function logout() {
    useSupabaseAuthClient().auth.signOut();
    console.log(useSupabaseUser().value.email);
    navigateTo("/");
  }
  const { data: user } = await useAsyncData("user", async () => {
    const { data, error } = await useSupabaseClient()
      .from("User")
      .select("*")
      .eq("id", useSupabaseUser().value.id)
      .single();
    if (!error) {
      return data;
    }
  });
  const refresh = () => refreshNuxtData("user");

  async function onImageUpload(e) {
    const fileName = uuidv4();
    const file = e.target.files[0];
    await useSupabaseClient().storage.from("images").remove(user.value.image);

    const { data, error } = await useSupabaseClient()
      .storage.from("images")
      .upload("public/users/" + fileName, file);
    if (error) {
      await useSupabaseClient()
        .storage.from("images")
        .remove("public/users/" + fileName);
    } else {
      const { error } = await useSupabaseClient()
        .from("User")
        .update({ image: data.path })
        .eq("id", useSupabaseUser().value.id);
      if (error) {
        console.log(error);
      }
    }
  }
  async function onBgImageUpload(e) {
    const fileName = uuidv4();
    const file = e.target.files[0];
    await useSupabaseClient().storage.from("images").remove(user.value.bgImage);

    const { data, error } = await useSupabaseClient()
      .storage.from("images")
      .upload("public/users/" + fileName, file);
    if (error) {
      await useSupabaseClient()
        .storage.from("images")
        .remove("public/users/" + fileName);
    } else {
      const { error } = await useSupabaseClient()
        .from("User")
        .update({ bgImage: data.path })
        .eq("id", useSupabaseUser().value.id);
      if (error) {
        console.log(error);
      }
    }
  }

  const { data: savedCars } = await useAsyncData(
    "savedCars",
    async () =>
      await $fetch(`/api/car/listings/user/saved/${useSupabaseUser().value.id}`)
  );

  const { data: savedParts } = await useAsyncData(
    "savedParts",
    async () =>
      await $fetch(
        `/api/part/listings/user/saved/${useSupabaseUser().value.id}`
      )
  );
  const refreshSaved = () => refreshNuxtData(["savedCars", "savedParts"]);

  onMounted(async () => {
    await refresh();
    await refreshSaved();
  });
  onBeforeUnmount(async () => {
    user.value = undefined;
    savedCars.value = undefined;
    savedParts.value = undefined;
  });
</script>
<style lang="scss" scoped>
  .primery-button {
    min-height: 0;
  }
</style>
