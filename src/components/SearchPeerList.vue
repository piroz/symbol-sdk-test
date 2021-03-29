<template>
    <v-card>
        <v-form v-model="state.isValid" @submit.prevent="findHost">
            <v-text-field v-model="state.searchParameer" label="search parameter" :rules="rules" />
            <v-btn block :disabled="!state.isValid" @click="findHost">find</v-btn>
        </v-form>

        <v-tabs v-model="state.tab" align-with-title v-if="state.found">
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="r in state.result" :key="r.apiNode">
                {{ r.friendlyName }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="state.tab" v-if="state.found">
            <v-tab-item v-for="r in state.result" :key="r.apiNode">
                <v-card flat>
                    <v-data-table :headers="state.tableHeaders" :items-per-page="5" :items="r.peers"></v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <v-alert type="error" v-if="state.isValid && !state.found">not found</v-alert>
    </v-card>
</template>

<script>
import { reactive } from "@vue/composition-api"
import { NodeService } from "@/service/node"

export default {
    setup() {

        const state = reactive({
            result: [],
            searchParameer: "",
            isValid: false,
            tab: null,
            found: false,
            tableHeaders: [
                {value: "host", text: "host", sortable: true},
                {value: "friendlyName", text: "friendlyName", sortable: true}
            ]
        })

        const rules = reactive([
            value => (value && value.length >= 2) || 'Min 2 characters',
        ])

        const nodeService = new NodeService()

        const findHost = async () => {
            state.result = (await nodeService.search(state.searchParameer)).filter(r => r.peers.length > 0)

            state.found = state.result.length > 0
        };

        return {
            rules,
            state,
            findHost
        }
    },
}
</script>
