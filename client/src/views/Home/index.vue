<template>
  <div class="dlg-home">
    <div class="dlg-home--container">
        <el-popover
          placement="top"
          title="Title"
          :width="200"
          trigger="hover"
          content="the size of the image must be less than 10M."
      >
        <template #reference>
          <el-button type="primary" @click="handleImgUpload('fileUpload')">
            <i class="el-icon-upload el-icon--left"></i> 上传图片
          </el-button>
        </template>
      </el-popover>
      <file-upload
        :id="`fileUpload`"
        :accept-type="`image/jpeg,image/jpg,image/png`"
        @handFile="handFile"
        ref="fileInput"
      >
      </file-upload>
    </div>
    <div class="dlg-home--imgList dlg-width">
      <el-card shadow="always">
        <el-form ref="imgForm" :model="form" label-width="120px" inline>
          <el-form-item label="水印文本内容">
            <el-input
              v-model="form.content"
              placeholder="请输入水印内容"
              size="small"
              clearable
              @input="getTextWaterImg"
            />
          </el-form-item>
          <el-form-item label="全图水印">
            <el-select size="small" @change="getTextWaterImg" placeholder="请选择" v-model="form.full">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作">
            <el-button :disabled="!hasUpload" type="primary" @click="handleDownload" size="small"> 下载图片</el-button>
            <el-button size="small" @click="reset"> 重置图片 </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    
      <div class="img-container">
        <div id="imgCanvas" class="imgCanvas"></div>
        <ImgMagnify v-show="imgUrl.length>0" :imgUrl="imgUrl"></ImgMagnify>
      </div>
    <!-- v-show="imgUrl.length>0" :imgUrl="imgUrl" -->
    <!-- <div class="dlg-home--remark">
      <p>备注1：请上传jpg,jpeg,或者png的图片，图片大小在100MB之内</p>
      <p>
        备注2：图片会调用后台自动进行压缩，防止图片过大.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
      </p>
      <p>
        备注3：完成水印后请尽快下载，30min后原图片自动删除.&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;
      </p>
    </div> -->
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import FileUpload from "../../components/upload/index.vue";
import { isImgFile, uploadImgAndPress,getImgUrl } from "../../../util/imgUtil.js";
import textWaterImg from './config'
import deepClone from '../../../util/deepClone';
import {waterTextImg} from '../../hooks/waterTextImg';
import ImgMagnify from '../../components/magnify/index.vue'
import {download} from '../../hooks/download'
export default {
  name: "home",
  components: {
    FileUpload,
    ImgMagnify
  },
  setup() {
    const form = ref(deepClone(textWaterImg));
    let hasUpload = ref(false);
    const imgUrl = ref('')
    const fileInput = ref(null)

    const handleImgUpload = (id) => {
      document.querySelector(`#${id}`).click();
      console.log(fileInput.value)
    };
  
    const handFile = async (file) => {
      console.log(isImgFile(file))
      if (!isImgFile(file)) return;
      try {
        const res = await uploadImgAndPress(file);
        form.value.textImgSrc = getImgUrl(res);
        imgUrl.value = getImgUrl(res)
        console.log(form);
        getTextWaterImg();
        hasUpload.value = true;
      } catch (error) {
        hasUpload.value = false;
      }
    };

    // 获取水印图片
    const getTextWaterImg = () => {
      waterTextImg(form, "imgCanvas");
    };
    const handleDownload = ()=>{
      download('imgCanvas')
    }
    const reset = () => {
      form.value = deepClone(textWaterImg);
      hasUpload.value = false;
      imgUrl.value = '';
      document.getElementById('imgCanvas').innerHTML = '';
      document.getElementById("fileUpload").value = '';
    }

    return {
      form,
      handleImgUpload,
      handFile,
      imgUrl,
      handleDownload,
      hasUpload,
      getTextWaterImg,
      reset,
      fileInput
    };
  },
};
</script>

<style lang="scss" scoped>
.dlg-home {
  width: 100%;
  .dlg-home--container {
    // width: 200px;
    margin: 10px 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
  .img-container{
    margin: 50px auto;
    display: flex;
    .imgCanvas {
      width: 375px;
      height: 500px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
