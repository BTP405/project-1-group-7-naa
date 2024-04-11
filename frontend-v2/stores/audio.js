export const useAudioStore = defineStore("audio", {
  state: () => ({
    usersUploads: [],
    loading: false,
    selectedAudio: {
        artist: '',
        title: '',
        id: Number,
        image: '',
        audioFile: null,
        duration: Number,
        currentTime: 0.00,
        volume: 100
    },
    isPlaying: false
  }),

  actions: {
    async fetchUploads() {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("userData"));

      try {
        useFetch(
          `http://localhost:5000/user/${loggedInUserInfo.user_id}/music`
        ).then((response) => (this.usersUploads = response.data.value.music));
      } catch (error) {
        console.error("Error: ", error);
      }
    },

    setSelectedAudio(audioID) {
        this.selectedAudio = audioID;
    },

    searchForSelectedAudio(id) {
      for (let i = 0; i < this.usersUploads.length; i++) {
        if (this.usersUploads[i].id === id) {
            this.selectedAudio.artist = this.usersUploads[i].artist;
            this.selectedAudio.title = this.usersUploads[i].title;
            this.selectedAudio.id = this.usersUploads[i].id;
            this.selectedAudio.image = getBase64Image(this.usersUploads[i].image);
            this.selectedAudio.audioFile = new Audio(getBase64Audio(this.usersUploads[i].mp3_file));
            
            this.selectedAudio.audioFile.addEventListener('loadedmetadata', () => {
                this.selectedAudio.duration = this.selectedAudio.audioFile.duration;
              });
            
              this.selectedAudio.audioFile.addEventListener('timeupdate', () => {
                this.selectedAudio.currentTime = this.selectedAudio.audioFile.currentTime;
                  });
              break;
        }
      }
      return null; // If no object with the provided ID is found
    },

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
          this.selectedAudio.audioFile.play();
        } else {
          this.selectedAudio.audioFile.pause();
        }
      },

      stopAudio() {
        this.isPlaying = false;
        this.selectedAudio.audioFile.pause();
        this.selectedAudio.audioFile.currentTime = 0; // Reset the audio to the beginning
      },

      updateVolume() {
        this.selectedAudio.audioFile.volume = this.selectedAudio.volume / 100;
      },

      playAudio() {
        this.isPlaying = true;
        this.selectedAudio.audioFile.play();
      },

      pauseAudio() {
        this.isPlaying = false;
        this.selectedAudio.audioFile.pause();
      }
  },
});
