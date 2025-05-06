import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useWardrobeStore = defineStore('wardrobe', () => {
  const faceImage = ref<string | null>(null);
  const outfitImage = ref<string | null>(null);
  const description = ref<string>('');
  const selectedBackground = ref<number>(1);
  const resultImage = ref<string | null>(null);

  function setFaceImage(image: string) {
    faceImage.value = image;
  }

  function setOutfitImage(image: string) {
    outfitImage.value = image;
  }

  function setDescription(text: string) {
    description.value = text;
  }

  function setSelectedBackground(index: number) {
    selectedBackground.value = index;
  }

  function setResultImage(image: string) {
    resultImage.value = image;
  }

  function reset() {
    faceImage.value = null;
    outfitImage.value = null;
    description.value = '';
    selectedBackground.value = 1;
    resultImage.value = null;
  }

  return {
    faceImage,
    outfitImage,
    description,
    selectedBackground,
    resultImage,
    setFaceImage,
    setOutfitImage,
    setDescription,
    setSelectedBackground,
    setResultImage,
    reset
  };
});
