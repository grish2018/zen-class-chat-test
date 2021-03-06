import { conversationsList, avatars, currentConversation } from './../../api/fetch'

export default {
    state: {
        conversationsList: [],
        currentConversation: [],
        avatars: [],
        isLoading: false,
    },
    getters: {
        conversationsList(state) {
            return state.conversationsList
        },
        currentConversation(state) {
            return state.currentConversation
        },
        isLoading(state) {
            return state.isLoading
        },
        userAvatar(state) {
            return id => state.avatars.filter(avatar => {
                return avatar.id == id
            });
        },
    },
    actions: {
        async fetchConversationsList({ commit }) {

            try {
                const { data } = await conversationsList();
                commit('setConversationsList', data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchAvatars({ commit }) {
            try {
                const { data } = await avatars()
                commit('setAvatars', data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchCurrentConversation({ commit, state }, id) {
            state.isLoading = true
            try {
                const { data } = await currentConversation(id)
                commit('setCurrentConversation', data)
                state.isLoading = false
            } catch (error) {
                console.log(error);
            }
        },

    },
    mutations: {
        setConversationsList(state, conversationsList) {
            state.conversationsList = conversationsList
        },
        setCurrentConversation(state, currentConversation) {
            state.currentConversation = currentConversation
        },
        setAvatars(state, avatars) {
            state.avatars = avatars
        },
        setNewMessage(state, message) {
            state.isLoading = true
            setTimeout(() => {
                const withNewMessage = [...state.currentConversation, message]
                state.currentConversation = withNewMessage
                state.isLoading = false
            }, 200)
        }
    }
}