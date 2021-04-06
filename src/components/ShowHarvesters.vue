<template>
    <v-card>
        <p class="pa-4">Symbol mainnetのノード一覧は<v-btn text color="purple darken-3" href="https://symbolnodes.org/nodes/" target="_balnk">こちら</v-btn>で確認できます</p>
        <v-form v-model="state.isValid" @submit.prevent="fetch">
            <v-row class="pa-4" align="center">
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-text-field  v-model="state.host" label="Symbol mainnetノードのアドレス(API)" placeholder="http://ngl-dual-001.symbolblockchain.io:3000" :rules="rules" />
                </v-col>
                <v-col cols="1">
                    <v-btn block :disabled="!state.isValid" @click="fetch">更新</v-btn>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-form>
        <v-data-table v-if="state.hasAccounts" :headers="state.tableHeaders" :items-per-page="5" :items="state.unlockedAccontInfo" calculate-widths widths="100%">
            <template #item.address="{ item }">
                <v-btn text color="purple darken-3" :href="item.explorerLink" target="_blank">{{item.address}}</v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { reactive } from "@vue/composition-api"
import { NodeService } from "@/service/node"

export default {
    setup() {

        const state = reactive({
            host: "http://ngl-dual-001.symbolblockchain.io:3000",
            isValid: false,
            unlockedAccontInfo: [],
            tableHeaders: [
                {value: "address", text: "address", sortable: true},
                {value: "importance.higher", text: "importance.higher", sortable: true},
                {value: "importance.lower", text: "importance.lower", sortable: true}
            ],
            hasAccounts: false
        })

        const re = /^http(|s):\/\/.+/

        const rules = reactive([
            value => (value && re.test(value)) || 'URLを確認してください',
        ])

        const nodeService = new NodeService()

        const fetch = async () => {
            try {
                const result = await nodeService.getUnlockedAccountInfo(state.host)
                state.unlockedAccontInfo = result.map(a => {
                    return {
                        address: a.address.address,
                        explorerLink: `http://explorer.symbolblockchain.io/accounts/${a.address.address}`,
                        importance: a.importance   
                    }
                })
                state.hasAccounts = state.unlockedAccontInfo.length > 0
            } catch(e) {
                console.log(e)
                alert("errror")
            }
        };

        return {
            rules,
            state,
            fetch
        }
    },
}
</script>