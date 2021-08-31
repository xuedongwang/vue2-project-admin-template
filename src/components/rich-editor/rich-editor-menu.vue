<template>
  <div class="rich-editor-menu">
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/undo.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/redo.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/brush.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/clear.svg">
    </div>
    <div class="rich-editor-menu-item">
      <split-line></split-line>
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/insert.svg">
      <span class="text">插入</span>
      <a-icon class="caret" type="caret-down" />
    </div>
    <div class="rich-editor-menu-item">
      <split-line></split-line>
    </div>
    <div class="rich-editor-menu-item">
      <span class="text">标题</span>
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <span class="text">默认字体</span>
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <span class="text">小一</span>
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <split-line></split-line>
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/bold.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/italic.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/underline.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/strike-through.svg">
    </div>
    <div class="rich-editor-menu-item">
      <split-line></split-line>
    </div>
    <div class="rich-editor-menu-item">
      <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g>
                <rect id="Rectangle" fill="#000000" opacity="0" x="0" y="0" width="22" height="22"></rect>
                <path d="M14.0935451,13.3494723 L7.87139588,13.3494723 L6.35258247,17.36 L5,17.36 L10.2804795,3.36 L11.6001043,3.36 L17,17.36 L15.6019331,17.36 L14.0935451,13.3494723 Z M13.6234113,12.0994723 L10.9931848,5.10618117 L8.34477916,12.0994723 L13.6234113,12.0994723 Z" id="Path-8复制" fill="#5C5C5C"></path>
            </g>
        </g>
      </svg>
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g>
                <rect id="Rectangle" fill="#000000" opacity="0" x="0" y="0" width="22" height="22"></rect>
                <path d="M11.708032,15.9672461 L10.7735027,17.5858984 L5,17.5858984 L7.37790499,13.4672461 L5.41507327,12.3340047 C5.19485618,12.2068623 5.11940424,11.9252718 5.24654663,11.7050547 L9.85078003,3.73028855 C9.97792242,3.51007146 10.2595129,3.43461952 10.47973,3.56176191 L18.4544962,8.1659953 C18.6747133,8.2931377 18.7501652,8.5747282 18.6230228,8.79494528 L14.0187894,16.7697115 C13.891647,16.9899285 13.6100565,17.0653805 13.3898394,16.9382381 L11.708032,15.9672461 Z M10.5385235,5.039082 L6.72386672,11.6462613 L13.331046,15.460918 L17.1457027,8.85373873 L10.5385235,5.039082 Z" id="形状结合" fill="#636363" fill-rule="nonzero"></path>
            </g>
        </g>
      </svg>
      <a-icon class="caret" type="caret-down" />
    </div>
    <div class="rich-editor-menu-item">
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g id="toolbar/paragraph/alignleft" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
            </g>
            <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M13,11.3 L13,12.7 L5,12.7 L5,11.3 L13,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
        </g>
      </svg>
      <a-icon class="caret" type="caret-down" />
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/bullet-list.svg">
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/numbered-list.svg">
      <a-icon class="caret" type="caret-down" />

    </div>
    <div class="rich-editor-menu-item">
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g id="toolbar_to_do_list" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="矩形" stroke="#979797" fill="#D8D8D8" opacity="0" x="0" y="0" width="24" height="24"></rect>
            <path d="M17.0799012,4.99815729 L15.7799012,6.29815729 L6.3,6.3 L6.297,9.99915729
                        L6.3,10 L6.3,14 L6.298,13.9991573 L6.3,17.7 L17.7,17.7 L17.6999012,12.5811573 L19,11.2811573
                          L19,18 C19,18.5522847 18.5522847,19 18,19 L6,19 C5.44771525,19 5,18.5522847
                          5,18 L5,6 C5,5.44771525 5.44771525,5 6,5 L17.0799012,4.99815729
                            Z M19.6568542,6.82157288 C19.910695,7.07541366 19.910695,7.4869709
                            19.6568542,7.74081169 L11.9847457,15.4129203 C11.7894835,15.6081824
                              11.472901,15.6081824 11.2776389,15.4129203 L8.34314575,12.4784271
                              C8.08930496,12.2245863 8.08930496,11.8130291 8.34314575,11.5591883
                                C8.59698654,11.3053475 9.00854378,11.3053475 9.26238457,11.5591883
                                L11.6311923,13.927996 L18.7376154,6.82157288 C18.9914562,6.56773209
                                  19.4030135,6.56773209 19.6568542,6.82157288 Z" id="Shape" fill="#464D5A"></path>
          </g>
      </svg>
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/indent.svg">
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/inc-indent.svg">
    </div>
    <div class="rich-editor-menu-item">
      <split-line></split-line>
    </div>
    <div class="rich-editor-menu-item">
      <img class="icon" src="./icons/find-replace.svg">
    </div>
    <div class="rich-editor-menu-item">
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <g id="toolbar/ai/tools" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"></rect>
            <path d="M13.35,18.7 C13.7089851,18.7 14,18.9910149 14,19.35 C14,19.7089851 13.7089851,20 13.35,20
                L10.65,20 C10.2910149,20 10,19.7089851 10,19.35 C10,18.9910149 10.2910149,18.7 10.65,18.7 L13.35,18.7
                Z M12,3.7 C15.5898509,3.7 18.5,6.61014913 18.5,10.2 C18.5,12.7072927 17.0803787,14.8830151 15.0010736,15.9672297
                L15,16.7 C15,17.2522847 14.5522847,17.7 14,17.7 L10,17.7 C9.44771525,17.7 9,17.2522847 9,16.7 L8.99992214,15.9677488
                C6.92007453,14.8837097 5.5,12.7076929 5.5,10.2 C5.5,6.61014913 8.41014913,3.7 12,3.7 Z M12,5 C9.1281193,5 6.8,7.3281193
                6.8,10.2 C6.8,12.1599837 7.89308955,13.9248725 9.60077919,14.8149388 C9.98744585,15.0164737 10.2443766,15.3964775
                10.2919336,15.8236521 L10.2999221,15.9676106 L10.3,16.4 L13.7,16.4 L13.701075,15.9653251 C13.7017129,15.5299336
                13.9198909,15.1272715 14.2762292,14.8880367 L14.4000168,14.8145239 C16.1072712,13.9243081 17.2,12.1596628
                17.2,10.2 C17.2,7.3281193 14.8718807,5 12,5 Z M12.7706682,7 C12.7913111,7 12.805073,7.00719424 12.811954,7.02158273
                L12.8274362,7.04766187 L12.8274362,7.04766187 L12.8325969,7.07913669 L12.5573583,9.74100719 L13.9335515,9.74100719
                C13.9587862,9.74086739 13.9822622,9.75450338 13.9954802,9.77697842 C14.0000675,9.79136691 14.0015966,9.80895284
                13.9980287,9.82547295 L13.9885992,9.84892086 L11.2293318,13.971223 L11.2043883,13.9910072 L11.2043883,13.9910072
                L11.1742841,14 L11.1261173,14 C11.1054744,14 11.0848315,13.9928058 11.0710696,13.9784173 L11.0590279,13.9523381
                L11.0590279,13.9523381 L11.0573076,13.9208633 L11.4219988,11.2086331 L10.0664485,11.2086331 C10.0389246,11.2086331
                10.0182817,11.1942446 10.0045198,11.1726619 C9.99993248,11.1582734 9.99840338,11.1406875 10.0019713,11.1241673
                L10.0114008,11.1007194 L12.6399299,7.02877698 L12.6648734,7.00899281 L12.6648734,7.00899281 L12.6949776,7
                L12.7706682,7 Z" id="形状" fill="#464D5A" fill-rule="nonzero"></path>
        </g>
      </svg>
      <a-icon class="caret" type="caret-down" />
    </div>
  </div>
</template>

<script>
import SplitLine from './split-line';
export default {
  data () {
    return {
    };
  },
  components: {
    SplitLine
  }
};
</script>

<style lang="scss" scoped>
.rich-editor-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: rgba(0, 0,0,.8);
  &-item {
    height: 30px;
    margin: 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .caret {
      font-size: 10px;
      color: rgba(0, 0,0,.4);
      padding-left: 6px;
    }
    .icon {
      display: block;
      transition: background .18s;
      &:not(.disabled):hover {
        background: rgba(0, 0, 0, 0.04);
      }
      &.disabled {
        opacity: .2;
      }
    }
  }
}
</style>
