<template>
  <div class="p-1 sm:pt-4 -mt-3 sm:mt-5 flex flex-col">
    <div class="rounded-lg border border-border-color pt-5 mb-5">
      <div class="flex px-2 sm:px-4 sm:mx-1">
        <input
          @change="checkboxSelected(), onChange(carOnParts, 'isOnParts')"
          :checked="carOnParts"
          class="w-7 h-7 text-accent-color rounded-md bg-white border-accent-color checked:bg-accent-color focus:ring-accent-color focus:outline-none mt-1 mb-4"
          type="checkbox"
          aria-label="cars-on-parts" />
        <label
          @click="checkboxSelected(), onChange(carOnParts, 'isOnParts')"
          class="ml-2 text-nowrap text-2xl"
          for="checkbox"
          >On Parts</label
        >
      </div>
      <div class="grid sm:grid-cols-3 grid-cols-1">
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
        <CarAddInput
          title="Year *"
          :type="'text'"
          placeholder="Year"
          name="year"
          @inputChange="onChange" />

        <CarAddSelect
          title="Engine *"
          :options="engines"
          name="engine"
          @selectChange="onChange" />
        <CarAddSelect
          title="Gearbox *"
          :options="gearboxes"
          name="gearbox"
          @selectChange="onChange" />

        <CarAddSelect
          title="Drivetrain *"
          :options="drivetrains"
          name="drivetrain"
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

        <CarAddSelect
          title="Color"
          :options="colors"
          name="color"
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
        placeholder="Describe your car in a few words..."
        @inputChange="onChange" />
    </div>
    <ReuseableButton
      :class="showFeatures ? 'active' : ''"
      class="dropdown-button mx-auto mb-5 px-8"
      @click="showFeatures = !showFeatures"
      >Show Features</ReuseableButton
    >
    <div v-if="showFeatures">
      <div
        class="border border-border-color border-b-0 rounded-t-lg flex items-center justify-center py-2 mt-1">
        <p class="flex items-center justify-center text-2xl">Extras</p>
      </div>
      <div class="flex flex-col-reverse sm:flex-row w-full pb-2">
        <div
          class="flex-1 border rounded-b-lg sm:rounded-br-none border-border-color">
          <div class="flex flex-col">
            <p class="flex items-center justify-center text-lg pt-1 mb-3">
              Safety
            </p>
            <SearchBigAdvancedParametersCheckbox
              @onCheckboxChange="onChange"
              v-for="feature in useSafetyFeatures().safetyFeatures"
              :extraName="{ feature: feature, category: 'safety' }" />

            <p
              class="flex items-center justify-center text-lg pt-1 mb-3 border-t border-border-color">
              Exterior
            </p>
            <SearchBigAdvancedParametersCheckbox
              @onCheckboxChange="onChange"
              v-for="feature in useExteriorFeatures().exteriorFeatures"
              :extraName="{ feature: feature, category: 'exterior' }" />

            <p
              class="flex items-center justify-center text-lg pt-1 mb-3 border-t border-border-color">
              Other
            </p>
            <SearchBigAdvancedParametersCheckbox
              @onCheckboxChange="onChange"
              v-for="feature in useOtherFeatures().otherFeatures"
              :extraName="{ feature: feature, category: 'other' }" />
          </div>
        </div>

        <div
          class="flex-1 border border-b-0 sm:rounded-br-lg sm:border-b border-border-color">
          <div class="flex flex-col">
            <p class="flex items-center justify-center pt-1 mb-3">Comfort</p>
            <SearchBigAdvancedParametersCheckbox
              @onCheckboxChange="onChange"
              v-for="feature in useComfortFeatures().comfortFeatures"
              :extraName="{ feature: feature, category: 'comfort' }" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center">
      <ReuseableButton
        @click="handleSubmit"
        :disabled="isButtonDisabled"
        :class="
          isButtonDisabled
            ? 'disabled hover:shadow-none bg-gray-500  border-gray-500  text-base sm:text-2xl px-6 sm:px-16 '
            : 'primery-button hover:shadow-sm hover:shadow-white'
        "
        class="px-20 sm:px-32 mx-auto mt-2">
        {{ isButtonDisabled ? "Please fill all require fields" : "Submit" }}
      </ReuseableButton>
      <p v-if="errorMessage" class="mt-2 text-lg text-red-600">
        {{ errorMessage }}
      </p>
    </div>
    {{
      carInfo.image.map((image) => {
        return image.name;
      })
    }}
  </div>
</template>
<script setup>
  import { v4 as uuidv4 } from "uuid";
  useHead({
    title: "Add Listing",
    meta: [
      {
        name: "description",
        content: "Put your car up for sale!",
      },
    ],
  });
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
  const carOnParts = ref(false);
  const showFeatures = ref(false);
  const errorMessage = ref("");
  const regionId = ref(0);
  const makeId = ref(0);
  const emits = defineEmits(["isOnPartsChange"]);
  function checkboxSelected() {
    carOnParts.value = !carOnParts.value;
    emits("isOnPartsChange", carOnParts.value);
  }

  const { data: makes } = await useFetch("/api/input/makes");
  const { data: models } = await useFetch(`/api/input/models/${makeId.value}`);
  const { data: engines } = await useFetch("/api/input/engines");
  const { data: gearboxes } = await useFetch("/api/input/gearboxes");
  const { data: drivetrains } = await useFetch("/api/input/drivetrains");
  const { data: regions } = await useFetch("/api/input/regions");
  const { data: cities } = await useFetch(
    `/api/input/cities/${regionId.value}`
  );
  const { data: colors } = await useFetch("/api/input/colors");

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

  const carInfo = useState("carInfo", () => {
    return {
      make: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      hp: "",
      engine: "",
      gearbox: "",
      drivetrain: "",
      region: "",
      city: "",
      features: [],
      color: "",
      description: "",
      isOnParts: false,
      image: [],
    };
  });
  const inputs = [
    {
      id: 1,
      title: "Mileage *",
      type: "text",
      name: "mileage",
      placeholder: "Mileage",
    },
    {
      id: 2,
      title: "Price *",
      type: "text",
      name: "price",
      placeholder: "Price",
    },
    {
      id: 3,
      title: "Horsepower *",
      type: "text",
      name: "hp",
      placeholder: "Horsepower",
    },
  ];

  onMounted(() => {
    for (let key in carInfo.value) {
      if (
        carInfo.value[key] &&
        key !== "isOnParts" &&
        key !== "image" &&
        key !== "features"
      ) {
        carInfo.value[key] = "";
      } else if (carInfo.value[key] && key === "isOnParts") {
        carInfo.value[key] = false;
      } else if (carInfo.value[key] && key === "features") {
        carInfo.value[key] = [];
      } else if (carInfo.value[key]) {
        carInfo.value[key] = [];
      }
    }
  });

  const isButtonDisabled = computed(() => {
    for (let key in carInfo.value) {
      if (
        !carInfo.value[key] &&
        key !== "features" &&
        key !== "description" &&
        key !== "color" &&
        key !== "isOnParts"
      ) {
        return true;
      }
    }
    if (carInfo.value.image.length <= 0) {
      return true;
    }
    return false;
  });

  function onChange(value, name, type) {
    if (name === "make") {
      carInfo.value.model = "";
      makeId.value = value.id ? value.id : 0;
    }
    if (name === "region") {
      carInfo.value.city = "";
      regionId.value = value.id ? value.id : 0;
    }
    if (type === "features") {
      if (value) {
        carInfo.value.features = [...carInfo.value.features, name];
        return;
      } else {
        const index = carInfo.value.features
          .map((f) => f.feature)
          .indexOf(name.feature);
        carInfo.value.features.splice(index, 1);
        return;
      }
    }
    if (name === "image") {
      if (type === "remove") {
        carInfo.value.image.splice(value, 1);
        return;
      }
      carInfo.value.image = [...carInfo.value.image, value];
      return;
    }
    carInfo.value[name] = value;
  }

  async function handleSubmit() {
    const imagesData = [];
    for (let i = 0; i < carInfo.value.image.length; i++) {
      const fileName = uuidv4();
      const { data, error } = await useSupabaseClient()
        .storage.from("images")
        .upload("public/cars/" + fileName, carInfo.value.image[i]);
      if (error) {
        return (errorMessage.value = error.message);
      }
      imagesData.push(data.path);
    }
    const body = {
      makeId: carInfo.value.make.id,
      modelId: carInfo.value.model.id,
      engineId: carInfo.value.engine.id,
      gearboxId: carInfo.value.gearbox.id,
      drivetrainId: carInfo.value.drivetrain.id,
      regionId: carInfo.value.region.id,
      cityId: carInfo.value.city.id,
      colorId: carInfo.value.color.id,
      description: carInfo.value.description,
      isOnParts: carInfo.value.isOnParts,
      features: carInfo.value.features,
      price: parseInt(carInfo.value.price),
      year: parseInt(carInfo.value.year),
      mileage: parseInt(carInfo.value.mileage),
      horsepower: parseInt(carInfo.value.hp),
      userId: useSupabaseUser().value.id,
      images: imagesData,
    };
    carInfo.value = {
      make: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      hp: "",
      engine: "",
      gearbox: "",
      drivetrain: "",
      region: "",
      city: "",
      features: [],
      color: "",
      description: "",
      isOnParts: false,
      image: [],
    };
    await $fetch("/api/car/listings/add", {
      method: "POST",
      body,
    })
      .then(async (res) => {
        if (res.statusCode) {
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
