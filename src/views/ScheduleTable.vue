<template>
  <div class="schedule">
    <div class="row">
      <div class="col">
        <b-card header-tag="header">
          <template #header>
            <h5 class="mb-0">資策會-中小企業公開資料擷取排程監控後台</h5>
          </template>
          <div class="action">
            <div class="inputNbtn">
              <b-form-input
                id="query"
                placeholder="請輸入統編直接查詢進度"
                class="inputStyle"
                v-model="uniform_nu"
              ></b-form-input>
              <b-button variant="primary" @click="anotherQuery('q')"
                >查詢</b-button
              >
              <b-button class="btn-gray" @click="getAlldata">全部排程</b-button>
            </div>
            <b-button variant="link" v-b-modal.create>新增任務</b-button>
          </div>
          <div class="scheduleTable">
            <b-table
              id="schedule"
              ref="schedule"
              :items="items"
              :fields="fields"
              thead-class="tableHeader"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
              :current-page="currentPage"
              :busy="isBusy"
              show-empty
              responsive
            >
              <template #empty>
                <div class="emptyClass">
                  <h5>查無相關排程進度</h5>
                </div>
              </template>
              <template #head(id)>
                <div class="text-nowrap">委託者ID</div>
              </template>
              <template #head(company)>
                <div class="text-nowrap">企業名稱</div>
              </template>
              <template #head(date)>
                <div class="text-nowrap">委託日</div>
              </template>
              <template #head(status)>
                <div class="text-nowrap">狀態</div>
              </template>
              <template v-slot:cell(index)="data">
                <span>{{ perPage * (currentPage - 1) + data.index + 1 }}</span>
              </template>
              <template v-slot:cell(date)="data">
                <span class="text-nowrap">{{ data.value }}</span>
              </template>
              <template v-slot:cell(registration)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'registration_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'registration_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(taxation)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'taxation_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'taxation_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(place)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'place_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'place_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(comment)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'comment_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'comment_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(litigation_sum)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'litigation_sum_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'litigation_sum_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(litigation_text)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'litigation_text_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'litigation_text_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(ai_model)="data">
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkBlue"
                  v-if="data.value.status == 'F'"
                ></b-icon>
                <span v-else-if="data.value.status == 'E'">
                  <b-icon
                    icon="x-square-fill"
                    font-scale="2"
                    class="xRed"
                    :id="'ai_model_' + data.item.uuid"
                  ></b-icon>
                  <b-popover
                    :target="'ai_model_' + data.item.uuid"
                    triggers="hover"
                    placement="leftbottom"
                  >
                    {{ data.value.error }}
                  </b-popover>
                </span>
                <b-icon
                  icon="check-square-fill"
                  font-scale="2"
                  class="checkGray"
                  v-else
                ></b-icon>
              </template>
              <template v-slot:cell(status)="data">
                <span v-if="data.value == 'P'" class="doing text-nowrap"
                  >處理中</span
                >
                <span v-else-if="data.value == 'F'" class="done">完成</span>
                <span v-else-if="data.value == 'E'" class="error">缺漏</span>
                <span v-else class="scheduled text-nowrap">排程中</span>
              </template>
              <template v-slot:cell(link)="data">
                <a :href="data.value" class="text-wrap link" target="_blank">{{
                  data.value
                }}</a>
              </template>
              <template v-slot:cell(redoBtn)="data">
                <b-button
                  class="redoBtn unFinish"
                  v-if="data.item.status == 'P' || data.item.status == null"
                  disabled
                  >重做</b-button
                >
                <b-button
                  class="redoBtn finish"
                  v-else
                  @click="redo(data.item.uuid)"
                  >重做</b-button
                >
              </template>
            </b-table>
          </div>
          <div class="paginationC">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="schedule"
              first-number
              last-number
            >
              <template #prev-text>
                <b-icon
                  icon="caret-left-fill"
                  font-scale="1"
                  class="pageActive"
                  @click="anotherQuery('p')"
                ></b-icon>
              </template>
              <template #page="scoped">
                <!-- <b-icon
                  icon="caret-left-fill"
                  font-scale="1"
                  class="pageActive"
                ></b-icon> -->
                <span @click="anotherQuery('p')">{{ scoped.page }}</span>
              </template>
              <template #next-text>
                <b-icon
                  icon="caret-right-fill"
                  font-scale="1"
                  class="pageActive"
                  @click="anotherQuery('p')"
                ></b-icon>
              </template>
            </b-pagination>
          </div>
        </b-card>
      </div>
    </div>
    <b-modal
      id="create"
      ref="create"
      size="lg"
      title="新增任務"
      ok-only
      centered
    >
      <div class="createForm">
        <b-form-input
          v-model="uniformNum"
          placeholder="輸入企業統一編號"
          :state="state"
        ></b-form-input>
        <b-form-input
          v-model="companyName"
          placeholder="輸入企業名稱"
        ></b-form-input>
        <b-form-select v-model="selected" :options="options">
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- 企業產業別 --</b-form-select-option
            >
          </template>
        </b-form-select>
        <b-form-input v-model="clientId" placeholder="委託者ID"></b-form-input>
      </div>
      <span class="spanText">*統編必填</span>
      <template #modal-footer>
        <b-button @click="createTask"> 新增 </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { getAllList, getexpList, getScope, redo, submit } from "@/apis.js";
export default {
  name: "scheduleTable",
  data() {
    return {
      state: null,
      rows: 0,
      selected: null,
      options: [],
      clientId: "",
      uniformNum: "",
      companyName: "",
      uniform_nu: "",
      isBusy: false,
      sortBy: "index",
      sortDesc: false,
      perPage: 5,
      currentPage: 1,
      pages: 10,
      items: [],
      fields: [
        {
          key: "index",
          label: "No.",
          sortable: true,
        },
        {
          key: "id",
          label: "委託者ID",
          sortable: true,
        },
        {
          key: "uniform",
          label: "統編",
          sortable: true,
        },
        {
          key: "company",
          label: "企業名稱",
          sortable: true,
        },
        {
          key: "date",
          label: "委託日",
          sortable: true,
        },
        {
          key: "registration",
          label: "商登",
          sortable: false,
        },
        {
          key: "taxation",
          label: "財稅",
          sortable: false,
        },
        {
          key: "place",
          label: "Google Place",
          sortable: false,
        },
        {
          key: "comment",
          label: "Google Comment",
          sortable: false,
        },
        {
          key: "litigation_sum",
          label: "訴訟摘要",
          sortable: false,
        },
        {
          key: "litigation_text",
          label: "訴訟全文",
          sortable: false,
        },
        {
          key: "ai_model",
          label: "模型",
          sortable: false,
        },
        {
          key: "status",
          label: "狀態",
          sortable: true,
        },
        {
          key: "link",
          label: "報告連結",
          sortable: false,
        },
        {
          key: "redoBtn",
          label: "重做",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    getAlldata() {
      this.isBusy = true;
      this.uniform_nu = "";
      this.items = [];
      this.currentPage = 1;
      getAllList({
        page: this.currentPage,
        limit: this.perPage,
      })
        .then((res) => {
          this.pages = Math.ceil(res.data.count / this.perPage);
          this.rows = res.data.count;
          for (let item of res.data.result) {
            this.items.push({
              id: item.client_id,
              uniform: item.uniform_nu,
              company: item.company_name,
              date: item.submit_time,
              registration: {
                status: item.status_uniform_nu,
                error: item.error_uniform_nu,
              },
              taxation: {
                status: item.status_etax,
                error: item.error_etax,
              },
              place: {
                status: item.status_google_place,
                error: item.error_google_place,
              },
              comment: {
                status: item.status_google_comment,
                error: item.error_google_comment,
              },
              litigation_sum: {
                status: item.status_litigation_summary,
                error: item.error_litigation_summary,
              },
              litigation_text: {
                status: item.status_litigation_text,
                error: item.error_litigation_text,
              },
              ai_model: {
                status: item.status_ai_model,
                error: item.error_ai_model,
              },
              status: item.status_final,
              link: item.report,
              uuid: item.uuid,
            });
          }
          this.isBusy = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    anotherQuery(action) {
      this.isBusy = true;
      if (action == "q") {
        this.items = [];
        this.currentPage = 1;
      }

      getexpList({
        page: this.currentPage,
        limit: this.perPage,
        uni: this.uniform_nu,
      })
        .then((res) => {
          this.pages = Math.ceil(res.data.count / this.perPage);
          if (action == "p") {
            for (let item of res.data.result) {
              if (this.items.length < res.data.count) {
                this.items.push({
                  id: item.client_id,
                  uniform: item.uniform_nu,
                  company: item.company_name,
                  date: item.submit_time,
                  registration: {
                    status: item.status_uniform_nu,
                    error: item.error_uniform_nu,
                  },
                  taxation: {
                    status: item.status_etax,
                    error: item.error_etax,
                  },
                  place: {
                    status: item.status_google_place,
                    error: item.error_google_place,
                  },
                  comment: {
                    status: item.status_google_comment,
                    error: item.error_google_comment,
                  },
                  litigation_sum: {
                    status: item.status_litigation_summary,
                    error: item.error_litigation_summary,
                  },
                  litigation_text: {
                    status: item.status_litigation_text,
                    error: item.error_litigation_text,
                  },
                  ai_model: {
                    status: item.status_ai_model,
                    error: item.error_ai_model,
                  },
                  status: item.status_final,
                  link: item.report,
                  uuid: item.uuid,
                });
              }
            }
          } else if (action == "q") {
            this.rows = res.data.count;
            for (let item of res.data.result) {
              this.items.push({
                id: item.client_id,
                uniform: item.uniform_nu,
                company: item.company_name,
                date: item.submit_time,
                registration: {
                  status: item.status_uniform_nu,
                  error: item.error_uniform_nu,
                },
                taxation: {
                  status: item.status_etax,
                  error: item.error_etax,
                },
                place: {
                  status: item.status_google_place,
                  error: item.error_google_place,
                },
                comment: {
                  status: item.status_google_comment,
                  error: item.error_google_comment,
                },
                litigation_sum: {
                  status: item.status_litigation_summary,
                  error: item.error_litigation_summary,
                },
                litigation_text: {
                  status: item.status_litigation_text,
                  error: item.error_litigation_text,
                },
                ai_model: {
                  status: item.status_ai_model,
                  error: item.error_ai_model,
                },
                status: item.status_final,
                link: item.report,
                uuid: item.uuid,
              });
            }
          }

          this.isBusy = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIndustry() {
      getScope()
        .then((res) => {
          for (let i of res.data.result) {
            this.options.push({
              value: i.id,
              text: i.name,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createTask() {
      if (this.uniformNum) {
        this.$refs['create'].hide()
        submit({
          uni: this.uniformNum,
          company: this.companyName,
          clientId: this.clientId,
          scope: this.selected,
        })
          .then((res) => {
            this.uniformNum = "";
            this.companyName = "";
            this.clientId = "";
            this.selected = null;
            this.state = null;
            this.items.push({
              id: res.data.result.client_id,
              uniform: res.data.result.uniform_nu,
              company: res.data.result.company_name,
              date: res.data.result.submit_time,
              registration: {
                status: res.data.result.status_uniform_nu,
                error: res.data.result.error_uniform_nu,
              },
              taxation: {
                status: res.data.result.status_etax,
                error: res.data.result.error_etax,
              },
              place: {
                status: res.data.result.status_google_place,
                error: res.data.result.error_google_place,
              },
              comment: {
                status: res.data.result.status_google_comment,
                error: res.data.result.error_google_comment,
              },
              litigation_sum: {
                status: res.data.result.status_litigation_summary,
                error: res.data.result.error_litigation_summary,
              },
              litigation_text: {
                status: res.data.result.status_litigation_text,
                error: res.data.result.error_litigation_text,
              },
              ai_model: {
                status: res.data.result.status_ai_model,
                error: res.data.result.error_ai_model,
              },
              status: res.data.result.status_final,
              link: res.data.result.report,
              uuid: res.data.result.uuid,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        this.state = false;
      }
    },
    redo(uuid) {
      redo({
        uuid: uuid,
      })
        .then((res) => {
          if (res.data) {
            var index = this.items.findIndex(
              (x) => x.uuid === res.data.result.uuid
            );
            this.items.splice(index, 1);
            this.items.push({
              id: res.data.result.client_id,
              uniform: res.data.result.uniform_nu,
              company: res.data.result.company_name,
              date: res.data.result.submit_time,
              registration: {
                status: res.data.result.status_uniform_nu,
                error: res.data.result.error_uniform_nu,
              },
              taxation: {
                status: res.data.result.status_etax,
                error: res.data.result.error_etax,
              },
              place: {
                status: res.data.result.status_google_place,
                error: res.data.result.error_google_place,
              },
              comment: {
                status: res.data.result.status_google_comment,
                error: res.data.result.error_google_comment,
              },
              litigation_sum: {
                status: res.data.result.status_litigation_summary,
                error: res.data.result.error_litigation_summary,
              },
              litigation_text: {
                status: res.data.result.status_litigation_text,
                error: res.data.result.error_litigation_text,
              },
              ai_model: {
                status: res.data.result.status_ai_model,
                error: res.data.result.error_ai_model,
              },
              status: res.data.result.status_final,
              link: res.data.result.report,
              uuid: res.data.result.uuid,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAlldata();
    this.getIndustry();
  },
};
</script>