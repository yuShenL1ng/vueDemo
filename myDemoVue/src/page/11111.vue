
<template>
        <Form ref="formValidate"  :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="100">
          <Collapse v-model="formValidate.value" accordion>
            <Panel name="1">
              2D模式
              <p slot="content">
                <Form-item label="地图名称" prop="name" :label-width="80">
                  <Input v-model="formValidate.name" placeholder="请输入地图名称"></Input>
                </Form-item>
                <Form-item label="地图类型" prop="maptype" :label-width="80">
                  <Radio-group v-model="formValidate.maptype">
                    <Radio label="gisMap">Gis地图</Radio>
                    <Radio label="staticMap">静态地图</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item v-show="gisMap" label="地图服务" prop="mapservre" :label-width="80">
                  <Input v-model="formValidate.mapservre" placeholder="请输入地图服务">
                  </Input>
                </Form-item>
                 <Form-item v-show="staticMap" label="地图文件" prop="mapservre" :label-width="80">
                  <Input v-model="formValidate.mapservre" placeholder="请输入地图服务">
                  </Input><Button style="cursor: pointer;position: absolute;background-color: #5d5d5d;left:398px;top:2px;border:0px;"  @click="addSysPic" type="text">预览</Button>
                </Form-item>
                <input type="file" @change="onSysFileChange" id="fileSysGrade" style="display: none">
                <Form-item label="级别" prop="zoomLevel" :label-width="80">
                  <Select v-model="formValidate.zoomLevel" placeholder="请选择级别">
                    <Option v-for="item in carLevel" :key="item" :value="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
                <Form-item label="中心点" prop="center" :label-width="80">
                  <Input v-model="formValidate.center" placeholder="请输入中心点"></Input>
                </Form-item>
                <Form-item label="地图范围" prop="extent" :label-width="80">
                  <Input v-model="formValidate.extent" placeholder="请输入地图范围"></Input>
                </Form-item>
              </p>
            </Panel>
            <Panel name="2">
              2.5D模式
              <p slot="content">2.5D模式</p>
            </Panel>
            <Panel name="3">
              3D模式
              <p slot="content">3D模式</p>
            </Panel>
          </Collapse>
          <Form-item  class="mapSaveButton" style="height: 20px;border-top: 1px solid #5d5d5d;">
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left:334px;margin-bottom: -12px;margin-right: 10px;">取消</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-bottom: -12px;">保存</Button>
          </Form-item>
        </Form>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        id: '',
        name: '',
        center: '',
        zoomLevel: '3',
        extent: '',
        maptype: 'gisMap',
        mapservre: '',
        isstatic: false,
        value: '1',
        type: '2D'
      },
      staticMap: false,
      gisMap: true,
      carLevel: [{'value': '1', 'label': '1级'}, {'value': '2', 'label': '2级'}, {'value': '3', 'label': '3级'}, {'value': '4', 'label': '4级'}, {'value': '5', 'label': '5级'}, {'value': '6', 'label': '6级'}, {'value': '7', 'label': '7级'}],
      ruleValidate: {
        name: [
          { required: true, message: '服务名不能为空', trigger: 'blur' }
        ],
        center: [
          { required: true, message: '中心点不能为空', trigger: 'blur' }
        ],
        zoomLevel: [
          { required: true, message: '级别不能为空', trigger: 'blur' }
        ],
        extent: [
          { required: true, message: '地图范围不能为空', trigger: 'blur' }
        ],
        mapservre: [
          { required: true, message: '地图服务不能为空', trigger: 'blur' }
        ],
        maptype: [
          { required: true, message: '地图类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
  },
  computed: {
  },
  created() {
  },
  watch: {
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>







<template>
    <div class="mapSet">
      <div class="addMap">添加地图</div>
      <div class="mapConfig">
       <setMap @saveClick='homeSaveClick'></setMap> //引用 setMap组件
     </div>
    </div>
</template>
<script>
import setMap from './setmap.vue' //import导入
export default {
  data() {
    return {
    }
  },
  components: {
    setMap //注册
  },
  created() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
.mapSet {
  background-color: #171717;
  padding: 28px 16px 1px 11px;
  width: 598px;
  border-radius: 5px 5px 5px 5px;
  position: fixed;
  left: 620px;
  top: 146px
}
.mapConfig {
  background-color: #171717;
}
.addMap {
  background-color: #5d5d5d;
  top: -28px;
  position: relative;
  width: 598px;
  height: 51.32px;
  left: -11px;
  padding: 12px 0px 0px 19px;
  border-radius: 5px 5px 0 0;
  font-size: 14px;
}

</style>