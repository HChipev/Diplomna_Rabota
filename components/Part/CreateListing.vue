<template>
  <div class="p-1 sm:pt-4 -mt-3 sm:mt-5 flex flex-col">
    <div class="rounded-lg border border-border-color pt-5 mb-5">
      <div class="grid sm:grid-cols-2 grid-cols-1">
        <CarAddSelect
          title="Make *"
          :options="makes"
          name="make"
          @selectChange="onChange" />
        <CarAddSelect
          title="Model *"
          :options="models"
          name="model"
          @selectChange="onChange" />

        <CarAddSelect
          title="Part Type *"
          :options="partTypes"
          name="partType"
          @selectChange="onChange" />

        <CarAddSelect
          title="Part Name *"
          :options="partNames"
          name="partName"
          @selectChange="onChange" />

        <CarAddSelect
          title="Region *"
          :options="regions"
          name="region"
          @selectChange="onChange" />

        <CarAddSelect
          title="City *"
          :options="cities"
          name="city"
          @selectChange="onChange" />

        <CarAddInput
          v-for="input in inputs"
          :type="input.type"
          :key="input.id"
          :title="input.title"
          :name="input.name"
          :placeholder="input.placeholder"
          @inputChange="onChange" />
      </div>
    </div>
    <div class="border border-border-color rounded-lg pt-5 mb-5">
      <CarAddImage @imageChange="onChange" />

      <CarAddTextarea
        title="Description"
        name="description"
        placeholder="Describe your part in a few words..."
        @inputChange="onChange" />
    </div>

    <div class="flex flex-col items-center justify-center">
      <ReuseableButton
        @click="handleSubmit"
        :disabled="isButtonDisabled"
        :class="
          isButtonDisabled
            ? 'disabled hover:shadow-none bg-gray-500  border-gray-500 text-base sm:text-2xl px-6 sm:px-16 '
            : 'primery-button hover:shadow-sm hover:shadow-white'
        "
        class="px-20 sm:px-32 mx-auto mt-2">
        {{ isButtonDisabled ? "Please fill all require fields" : "Submit" }}
      </ReuseableButton>
      <p v-if="errorMessage" class="mt-2 text-lg text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
  import { v4 as uuidv4 } from "uuid";
  useHead({
    title: "Add Listing",
    meta: [
      {
        name: "description",
        content: "Put your part up for sale!",
      },
    ],
  });
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
  const errorMessage = ref("");
  const regionId = ref(0);
  const makeId = ref(0);
  const partTypeId = ref(0);
  const emits = defineEmits(["loaded"]);

  const { data: makes } = await useFetch("/api/input/makes");
  const { data: models } = await useFetch(`/api/input/models/${makeId.value}`);
  const { data: partTypes } = await useFetch("/api/input/partType");
  const { data: partNames } = await useFetch(
    `/api/input/partName/${partTypeId.value}`
  );
  const { data: regions } = await useFetch("/api/input/regions");
  const { data: cities } = await useFetch(
    `/api/input/cities/${regionId.value}`
  );
  emits("loaded");

  watch(
    () => makeId.value,
    async (id) => {
      models.value = id !== 0 ? await $fetch(`/api/input/models/${id}`) : [];
    }
  );
  watch(
    () => regionId.value,
    async (id) => {
      cities.value = id !== 0 ? await $fetch(`/api/input/cities/${id}`) : [];
    }
  );
  watch(
    () => partTypeId.value,
    async (id) => {
      partNames.value =
        id !== 0 ? await $fetch(`/api/input/partName/${id}`) : [];
    }
  );

  const partInfo = useState("partInfo", () => {
    return {
      make: "",
      model: "",
      partType: "",
      partName: "",
      year: "",
      price: "",
      region: "",
      city: "",
      description: "",
      image: [],
    };
  });
  const inputs = [
    {
      id: 1,
      title: "Year *",
      type: "text",
      name: "year",
      placeholder: "Year",
    },
    {
      id: 2,
      title: "Price *",
      type: "text",
      name: "price",
      placeholder: "Price",
    },
  ];

  onMounted(() => {
    for (let key in partInfo.value) {
      if (!partInfo.value[key] && key !== "image") {
        partInfo.value[key] = "";
      } else {
        partInfo.value[key] = [];
      }
    }
  });

  const isButtonDisabled = computed(() => {
    for (let key in partInfo.value) {
      if (!partInfo.value[key] && key !== "description") {
        return true;
      }
    }
    if (partInfo.value.image.length <= 0) {
      return true;
    }
    return false;
  });

  function onChange(value, name, type) {
    if (name === "make") {
      partInfo.value.model = "";
      makeId.value = value.id ? value.id : 0;
    }
    if (name === "region") {
      partInfo.value.city = "";
      regionId.value = value.id ? value.id : 0;
    }
    if (name === "partType") {
      partInfo.value.partName = "";
      partTypeId.value = value.id ? value.id : 0;
    }
    if (name === "image") {
      if (type === "remove") {
        partInfo.value.image.splice(value, 1);
        return;
      }
      partInfo.value.image = [...partInfo.value.image, value];
      return;
    }

    partInfo.value[name] = value;
  }

  async function handleSubmit() {
    const imagesData = [];
    for (let i = 0; i < partInfo.value.image.length; i++) {
      const fileName = uuidv4();
      const { data, error } = await useSupabaseClient()
        .storage.from("images")
        .upload("public/parts/" + fileName, partInfo.value.image[i]);
      if (error) {
        return (errorMessage.value = error.message);
      }
      imagesData.push(data.path);
    }
    const body = {
      makeId: partInfo.value.make.id,
      modelId: partInfo.value.model.id,
      partTypeId: partInfo.value.partType.id,
      partNameId: partInfo.value.partName.id,
      regionId: partInfo.value.region.id,
      cityId: partInfo.value.city.id,
      description: partInfo.value.description,
      price: parseInt(partInfo.value.price),
      year: parseInt(partInfo.value.year),
      userId: useSupabaseUser().value.id,
      images: imagesData,
    };
    const tempPartsInfo = partInfo.value;
    partInfo.value = {
      make: "",
      model: "",
      partType: "",
      partName: "",
      year: "",
      price: "",
      region: "",
      city: "",
      description: "",
      image: [],
    };

    await $fetch("/api/part/listings/add", {
      method: "POST",
      body,
    })
      .then(async (res) => {
        if (res.statusCode) {
          partInfo.value = tempPartsInfo;
          errorMessage.value = res.body.message;
          for (let i = 0; i < imagesData.length; i++) {
            await useSupabaseClient()
              .storage.from("images")
              .remove(imagesData[i]);
          }
        } else {
          navigateTo("/account/my-listings");
        }
      })
      .catch(async (err) => {
        errorMessage.value = err.message;
        for (let i = 0; i < imagesData.length; i++) {
          await useSupabaseClient()
            .storage.from("images")
            .remove(imagesData[i]);
        }
      });
  }
</script>
