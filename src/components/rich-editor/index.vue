<template>
  <div class="rich-editor" v-if="editor">
    <div class="rich-editor-main">
      <div class="rich-editor-menu">
        <div class="rich-editor-menu-item" @mousedown.prevent="editor.chain().focus().undo().run()" :class="{disabled: !editor.can().undo()}">
          <img class="icon" src="./icons/undo.svg">
        </div>
        <div class="rich-editor-menu-item" @mousedown.prevent="editor.chain().focus().redo().run()" :class="{disabled: !editor.can().redo()}">
          <img class="icon" src="./icons/redo.svg">
        </div>
        <div class="rich-editor-menu-item">
          <img class="icon" src="./icons/brush.svg">
        </div>
        <div class="rich-editor-menu-item" @mousedown.prevent="[editor.chain().focus().unsetAllMarks().run(),editor.chain().focus().clearNodes().run()]">
          <img class="icon" src="./icons/clear.svg">
        </div>
        <div class="rich-editor-menu-item">
          <split-line></split-line>
        </div>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-three" :trigger="['hover']">
          <div class="rich-editor-menu-item insert">
            <img class="icon" src="./icons/insert.svg">
            <span class="text">插入</span>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item @mousedown.prevent="handleInsert('image')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                    class="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <title>toolbar_add_photo</title>
                    <g id="toolbar_add_photo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="编组" transform="translate(4.000000, 5.000000)" fill="#464D5A">
                            <path d="M14.4166667,0.583333333 C14.9229277,0.583333333 15.3333333,0.993738979 15.3333333,1.5 L15.3333333,12.5 C15.3333333,13.006261 14.9229277,13.4166667 14.4166667,13.4166667 L1.58333333,13.4166667 C1.07707231,13.4166667 0.666666667,13.006261 0.666666667,12.5 L0.666666667,1.5 C0.666666667,0.993738979 1.07707231,0.583333333 1.58333333,0.583333333 L14.4166667,0.583333333 Z M14.1416667,1.775 L1.85833333,1.775 L1.85833333,12.225 L14.1416667,12.225 L14.1416667,1.775 Z M9.52777778,5.16666667 L12.5833333,10.6666667 L3.41666667,10.6666667 L5.4537037,7.00916667 L6.97525028,9.50611621 L9.52777778,5.16666667 Z" id="Shape"/>
                        </g>
                        <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"/>
                    </g>
                  </svg>
                  <span class="text">图片</span>
                </div>
              </div>
            </a-menu-item>
            <a-sub-menu>
              <div class="dropdown-menu-item-inner" slot="title">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      class="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_table</title>
                      <g id="toolbar_add_table" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M18.875,5.58333333 C19.1281305,5.58333333 19.3333333,5.78853616 19.3333333,6.04166667 L19.3333333,17.9583333 C19.3333333,18.2114638 19.1281305,18.4166667 18.875,18.4166667 L5.125,18.4166667 C4.87186949,18.4166667 4.66666667,18.2114638 4.66666667,17.9583333 L4.66666667,6.04166667 C4.66666667,5.78853616 4.87186949,5.58333333 5.125,5.58333333 L18.875,5.58333333 Z M9.25,14.7756667 L5.85741667,14.7756667 L5.85833333,17.225 L9.25,17.225 L9.25,14.7756667 Z M18.1416667,14.7756667 L10.3958333,14.7756667 L10.3958333,17.225 L18.1416667,17.225 L18.1416667,14.7756667 Z M9.25,10.8541667 L5.85741667,10.8541667 L5.85741667,13.6298333 L9.25,13.6298333 L9.25,10.8541667 Z M18.1416667,10.8541667 L10.3958333,10.8541667 L10.3958333,13.6298333 L18.1416667,13.6298333 L18.1416667,10.8541667 Z M9.25,6.77408333 L5.85833333,6.775 L5.85741667,9.70833333 L9.25,9.70833333 L9.25,6.77408333 Z M18.1416667,6.775 L10.3958333,6.77408333 L10.3958333,9.70833333 L18.1416667,9.70833333 L18.1416667,6.775 Z" id="Shape" fill="#464D5A" fill-rule="nonzero"/>
                          <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"/>
                      </g>
                  </svg>
                  <span class="text">表格</span>
                </div>
              </div>
              <a-menu-item style="background:#fff;">
                <div class="table-size">
                  <div class="table-size-head">{{hasSelectedTableCell ? `${table.row}×${table.column}表格` : '插入表格'}}</div>
                  <div
                    class="table-size-body"
                    @mouseenter="handleMouseenter"
                    @mousemove="handleMousemove"
                    @mouseleave="handleMouseleave"
                    @mousedown.prevent="handleSelectedTableCell"
                  >
                    <div v-for="row of tableSize.row" class="row" :key="row">
                      <div
                        v-for="column of tableSize.column"
                        :data-position="`${row}|${column}`"
                        :key="column"
                        class="box"
                        :class="{selected: table.row >= row && table.column >= column}"
                      ></div>
                    </div>
                  </div>
                  <div class="table-size-foot">自定义行列数</div>
              </div>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item @mousedown.prevent="handleInsert('link')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      class="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_link</title>
                      <g id="toolbar_add_link" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M11.6683218,6.81980383 C13.3169491,5.1711765 15.9899022,5.1711765 17.6385295,6.81980383 C19.2871568,8.46843117 19.2871568,11.1413842 17.6385295,12.7900115 L15.9801385,14.4484026 C15.718186,14.6365403 15.3516957,14.6159875 15.1177751,14.3820669 C14.8838546,14.1481464 14.8633013,13.7816565 15.0561163,13.5244401 L16.7098305,11.8613126 C17.8455516,10.7255915 17.8455516,8.88422386 16.7098305,7.74850281 C15.6132723,6.65194455 13.8588936,6.61413222 12.7169684,7.63506577 L12.5970208,7.74850281 L10.9386297,9.40689384 C10.6766773,9.59503158 10.310187,9.57447877 10.0762664,9.3405582 C9.84234583,9.10663763 9.82179262,8.74014773 10.0146076,8.48293138 L10.0099308,8.47819486 L11.6683218,6.81980383 Z M8.01986153,10.4682641 C8.27631467,10.211811 8.69210737,10.211811 8.94856051,10.4682641 C9.17936833,10.6990719 9.20244869,11.0589452 9.01780243,11.315566 L8.94856051,11.3969631 L7.29016948,13.0553541 C6.15444842,14.1910752 6.15444842,16.0324428 7.29016948,17.1681639 C8.38672773,18.2647221 10.1411057,18.3025351 11.2830309,17.2816016 L11.4029792,17.1681639 L13.0613703,15.5097728 C13.3178234,15.2533197 13.7336161,15.2533197 13.9900692,15.5097728 C14.2208771,15.7405807 14.2439574,16.1004539 14.0593112,16.3570748 L13.9900692,16.4384718 L12.3316782,18.0968628 C10.6830509,19.7454902 8.01009784,19.7454902 6.3614705,18.0968628 C4.71284317,16.4482355 4.71284317,13.7752825 6.3614705,12.1266551 L8.01986153,10.4682641 Z M13.7744784,9.75515596 C14.0034544,9.52617994 14.3746979,9.52617994 14.6036739,9.75515596 L14.7031774,9.85465942 C14.9321534,10.0836354 14.9321534,10.4548789 14.7031774,10.6838549 L10.2255216,15.1615107 C9.99654558,15.3904867 9.6253021,15.3904867 9.39632608,15.1615107 L9.29682262,15.0620072 C9.0678466,14.8330312 9.0678466,14.4617878 9.29682262,14.2328117 L13.7744784,9.75515596 Z" id="形状" fill="#444D5B" fill-rule="nonzero"/>
                          <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"/>
                      </g>
                  </svg>
                  <span class="text">链接</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item @mousedown.prevent="handleInsert('code-block')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_code_block</title>
                      <g id="toolbar_add_code_block" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M12.7402379,6.5213324 L13.9798427,6.85348351 L11.1328332,17.4786676 L9.8932284,17.1465165 L12.7402379,6.5213324 Z M7.89820675,8.01598876 L8.79166667,8.9044503 L5.53628165,12.1403541 L8.79166667,15.3775272 L7.89820675,16.2659888 L3.75,12.1409888 L7.89820675,8.01598876 Z M16.1017932,8.01598876 L20.25,12.1409888 L16.1017932,16.2659888 L15.2083333,15.3775272 L18.4637184,12.1403541 L15.2083333,8.9044503 L16.1017932,8.01598876 Z" id="Shape" fill="#424D5C"/>
                          <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"/>
                      </g>
                  </svg>
                  <span class="text">代码块</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item @mousedown.prevent="handleInsert('LaTex')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_latex</title>
                      <g id="视觉" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="PPT-插入菜单" transform="translate(-169.000000, -145.000000)">
                              <g id="编组-4" transform="translate(157.000000, 95.000000)">
                                  <g id="toolbar_add_latex" transform="translate(0.000000, 8.000000)">
                                      <g transform="translate(12.000000, 42.000000)">
                                          <rect id="矩形" fill="white" opacity="0" x="0" y="0" width="24" height="24"/>
                                          <path d="M19.279,6.6 L19.079,7.687 L16.0634779,7.68745645 L15.0710505,13.5089245 L14.8177161,14.9274695 L14.7579784,15.3222316 L14.7406701,15.4877418 L14.730939,15.7256179 L14.7328598,15.961681 C14.764913,16.8520617 15.1384347,17.1722936 16.1910425,17.2724136 L16.527535,17.2961962 L16.9067984,17.3088724 L17.242,17.312 L16.789,18.4 L16.2600277,18.4 C13.9624968,18.4 13.1421853,17.8589791 13.1421853,16.3728223 L13.1465883,16.0601716 L13.1679672,15.8007384 L13.252462,15.222444 L14.5366687,7.68745645 L9.0036871,7.68745645 L7.211,18.241 L5.686,18.241 L7.5003505,7.68745645 L4.891,7.687 L5.333,6.6 L19.279,6.6 Z" id="路径" fill="#444D5B" fill-rule="nonzero"/>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </svg>
                  <span class="text">LaTeX公式</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item @mousedown.prevent="handleInsert('signature')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_signature</title>
                      <g id="控件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="ICON/toolbar/add/signature">
                              <rect id="bg" x="0" y="0" width="24" height="24"/>
                              <path d="M5.69062349,12.6847807 C6.6894815,11.9543702 7.40899854,12.4743149 7.4409665,13.3603932 C7.47293446,14.2464715 6.49496828,15.1258884 5.372481,16.2261769 C4.24999371,17.3264653 3.25464521,19.4157628 3.53522904,19.8489816 C3.81581287,20.2822004 4.38481936,19.8324159 5.6227588,18.9197095 C6.86069825,18.007003 8.17995251,17.1496503 8.87654121,17.3813287 C9.57312992,17.6130071 9.40574281,18.4421825 9.01314488,19.3547868 C8.62054694,20.267391 8.12146933,20.826506 8.31440457,21.0622188 C8.35777294,21.1152028 8.59051003,21.0406352 8.84842993,20.9518835 L9.10866315,20.8626025 C9.36512873,20.7769911 9.5920485,20.7149846 9.62523659,20.7899507 C9.70267544,20.9648714 8.58491991,21.5565492 8.1760096,21.5565492 C7.76709928,21.5565492 7.55098148,21.3445627 7.64800891,20.8290014 C7.688437,20.6141842 7.83537519,20.2660135 8.00114831,19.8986655 L8.2035056,19.4559501 C8.37031862,19.0915285 8.5208965,18.7536001 8.56756405,18.5563411 C8.67956618,18.0829196 8.17995251,18.1826946 7.91130872,18.4421825 C7.64266493,18.7016705 5.20655857,20.7669832 4.48260918,21.2065177 C3.75865979,21.6460523 2.8718724,21.6847557 2.45432744,21.1502391 C2.03678247,20.6157225 1.7690517,19.9973864 2.27913458,18.1826946 C2.78921747,16.3680028 4.69176548,13.4151913 5.69062349,12.6847807 Z M15.1652409,4.94854139 C15.5319785,4.05887464 16.5504955,3.6349568 17.4401622,4.00169439 C17.5176577,4.03363949 17.5927469,4.0711351 17.664845,4.11388911 L17.664845,4.11388911 L21.2626878,6.24740289 C22.0903911,6.73822934 22.3634838,7.8071089 21.8726573,8.63481221 C21.8434351,8.684091 21.8118001,8.7318985 21.7778677,8.77806049 L21.7778677,8.77806049 L18.6464205,13.0381126 C18.3284973,13.4706185 17.7344131,13.5915595 17.272669,13.3178299 L17.295,13.32974 L16.1988306,16.5780374 L11.1570732,20.5321925 C10.9749788,20.6750057 10.7115893,20.643162 10.5687761,20.4610676 C10.4982404,20.3711309 10.4675052,20.2562835 10.4836926,20.1431381 L11.3908771,13.8021642 L13.687,11.19174 L13.5838991,11.1303128 C13.1721288,10.8861337 12.9834347,10.3971114 13.1122988,9.94619853 L13.1511853,9.83442802 Z M14.7585698,11.8667286 L12.5756532,14.3476509 L12.0140407,18.2703924 L15.1338923,15.8246509 L16.1901097,12.6932286 L14.7585698,11.8667286 Z M16.963776,5.15735706 C16.7123641,5.0537203 16.4245404,5.17351569 16.3209036,5.42492757 L16.3209036,5.42492757 L14.3753762,10.1460604 L17.7497939,12.1473976 L20.7706975,8.0377173 L20.7975137,7.99725369 C20.9361873,7.76333505 20.8590138,7.46127924 20.6251122,7.32257607 L20.6251122,7.32257607 L17.0272694,5.18906229 Z" id="形状结合" fill="#444D5B"/>
                          </g>
                      </g>
                  </svg>
                  <span class="text">电子签名</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item @mousedown.prevent="handleInsert('divider')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <title>toolbar_add_divide</title>
                      <g id="toolbar_add_divide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="编组" transform="translate(5.000000, 6.000000)" fill="#464D5A">
                              <path d="M2.08928571,5.08333333 L2.08928571,6.45833333 L0.125,6.45833333 L0.125,5.08333333 L2.08928571,5.08333333 Z M5.03571429,5.08333333 L5.03571429,6.45833333 L3.07142857,6.45833333 L3.07142857,5.08333333 L5.03571429,5.08333333 Z M7.98214286,5.08333333 L7.98214286,6.45833333 L6.01785714,6.45833333 L6.01785714,5.08333333 L7.98214286,5.08333333 Z M10.9285714,5.08333333 L10.9285714,6.45833333 L8.96428571,6.45833333 L8.96428571,5.08333333 L10.9285714,5.08333333 Z M13.875,5.08333333 L13.875,6.45833333 L11.9107143,6.45833333 L11.9107143,5.08333333 L13.875,5.08333333 Z" id="合并形状"/>
                              <rect id="矩形-copy-32" x="0.125" y="0.5" width="13.75" height="1.375"/>
                              <path d="M4.05357143,10.125 L4.05357143,11.5 L0.125,11.5 L0.125,10.125 L4.05357143,10.125 Z M8.96428571,10.125 L8.96428571,11.5 L5.03571429,11.5 L5.03571429,10.125 L8.96428571,10.125 Z M13.875,10.125 L13.875,11.5 L9.94642857,11.5 L9.94642857,10.125 L13.875,10.125 Z" id="合并形状"/>
                          </g>
                          <rect id="矩形备份" fill="#E4E4E4" opacity="0" x="0" y="0" width="24" height="24"/>
                      </g>
                  </svg>
                  <span class="text">分隔线</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item @mousedown.prevent="handleInsert('enter')">
              <div class="dropdown-menu-item-inner">
                <div class="dropdown-menu-item-inner-left">
                  <span class="text">插入回车</span>
                </div>
              </div>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <div class="rich-editor-menu-item">
          <split-line></split-line>
        </div>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-four" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <span class="text" style="width:38px;">{{ currentTitleType }}</span>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <template v-for="item of titleType.list">
              <a-menu-divider :key="item.name" v-if="item.type === 'divider'"></a-menu-divider>
              <a-menu-item
                v-else
                class="rich-editor-menu-item-dropdown-four-item"
                :key="item.name"
                @mousedown.prevent="handleSetTitleType(item)"
              >
                <svg
                  class="select-icon"
                  v-if="item.name === currentTitleType"
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
                </svg>
                <span class="text" :style="item.fontStyle">{{ item.name }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </a-dropdown>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-four" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <span class="text" style="min-width:100px;text-align:center;">{{ currentFontFamily }}</span>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item
              v-for="item of fontFamily.list"
              :key="item.name"
              style="width:200px;"
              class="rich-editor-menu-item-dropdown-four-item"
              @mousedown.prevent="handleSetFontFamily(item)"
            >
              <svg
                class="select-icon"
                v-if="item.name === currentFontFamily"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <span class="text" :style="{fontFamily: item.value}">{{ item.name }}</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-one" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <span class="text" style="width:30px;">{{ currentFontSize }}</span>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item
              v-for="item of fontSize.list"
              :key="item.name"
              class="rich-editor-menu-item-dropdown-one-item"
              @mousedown.prevent="handleSetFontSize(item)"
            >
              <svg
                class="select-icon"
                v-if="item.name === currentFontSize"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <span class="text">{{ item.name }}</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div class="rich-editor-menu-item">
          <split-line></split-line>
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('bold')}" @mousedown.prevent="editor.chain().focus().toggleBold().run()">
          <img class="icon" src="./icons/bold.svg">
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('italic')}" @mousedown.prevent="editor.chain().focus().toggleItalic().run()">
          <img class="icon" src="./icons/italic.svg">
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('underline')}" @mousedown.prevent="editor.chain().focus().toggleUnderline().run()">
          <img class="icon" src="./icons/underline.svg">
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('strike')}" @mousedown.prevent="editor.chain().focus().toggleStrike().run()">
          <img class="icon" src="./icons/strike-through.svg">
        </div>
        <div class="rich-editor-menu-item">
          <split-line></split-line>
        </div>
        <a-dropdown overlayClassName="rich-editor-menu-item-drapdown-two" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <div class="picker-color">
              <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g>
                        <rect id="Rectangle" fill="#000000" opacity="0" x="0" y="0" width="22" height="22"></rect>
                        <path d="M14.0935451,13.3494723 L7.87139588,13.3494723 L6.35258247,17.36 L5,17.36 L10.2804795,3.36 L11.6001043,3.36 L17,17.36 L15.6019331,17.36 L14.0935451,13.3494723 Z M13.6234113,12.0994723 L10.9931848,5.10618117 L8.34477916,12.0994723 L13.6234113,12.0994723 Z" id="Path-8复制" fill="#5C5C5C"></path>
                    </g>
                </g>
              </svg>
              <div class="current-color" :style="{background: currentFontColor}"></div>
            </div>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item class="rich-editor-menu-item-drapdown-two-item">
              <sketch-picker
                @input="handleSetFontColor"
                :value="currentFontColor"
              ></sketch-picker>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown overlayClassName="rich-editor-menu-item-drapdown-two" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <div class="picker-color">
              <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g>
                        <rect id="Rectangle" fill="#000000" opacity="0" x="0" y="0" width="22" height="22"></rect>
                        <path d="M11.708032,15.9672461 L10.7735027,17.5858984 L5,17.5858984 L7.37790499,13.4672461 L5.41507327,12.3340047 C5.19485618,12.2068623 5.11940424,11.9252718 5.24654663,11.7050547 L9.85078003,3.73028855 C9.97792242,3.51007146 10.2595129,3.43461952 10.47973,3.56176191 L18.4544962,8.1659953 C18.6747133,8.2931377 18.7501652,8.5747282 18.6230228,8.79494528 L14.0187894,16.7697115 C13.891647,16.9899285 13.6100565,17.0653805 13.3898394,16.9382381 L11.708032,15.9672461 Z M10.5385235,5.039082 L6.72386672,11.6462613 L13.331046,15.460918 L17.1457027,8.85373873 L10.5385235,5.039082 Z" id="形状结合" fill="#636363" fill-rule="nonzero"></path>
                    </g>
                </g>
              </svg>
              <div class="current-color" :style="{background: currentBackgroundColor}"></div>
            </div>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item class="rich-editor-menu-item-drapdown-two-item">
              <sketch-picker
                :value="currentBackgroundColor"
                @input="handleSetFontBackgroundColor"
              ></sketch-picker>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-one" :trigger="['hover']">
          <div class="rich-editor-menu-item">
            <svg width="24px" v-if="editor.isActive({ textAlign: 'left' })" height="24px" viewBox="0 0 24 24" version="1.1">
              <g id="toolbar/paragraph/alignleft" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                      <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                  </g>
                  <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M13,11.3 L13,12.7 L5,12.7 L5,11.3 L13,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
              </g>
            </svg>
            <svg width="24px" v-if="editor.isActive({ textAlign: 'center' })" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g id="toolbar/paragraph/aligncenter" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="_图标/工具栏/icon/居中对齐">
                          <rect id="Rectangle复制-23" fill="#000000" opacity="0" x="0" y="0" width="24" height="24"></rect>
                          <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M16,11.3 L16,12.7 L8,12.7 L8,11.3 L16,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                      </g>
                  </g>
              </svg>
              <svg width="24px" v-if="editor.isActive({ textAlign: 'right' })" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="toolbar/paragraph/alignright" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                        <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                    </g>
                    <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M19,11.3 L19,12.7 L11,12.7 L11,11.3 L19,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                </g>
              </svg>
              <svg width="24px" v-if="editor.isActive({ textAlign: 'justify' })" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g id="toolbar/paragraph/justify" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                          <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                      </g>
                      <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M19,11.3 L19,12.7 L5,12.7 L5,11.3 L19,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                  </g>
              </svg>
            <a-icon class="caret" type="caret-down" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item
              class="rich-editor-menu-item-dropdown-one-item"
              @mousedown.prevent="handleSetTextAlign('left')"
            >
              <svg
                class="select-icon"
                v-if="editor.isActive({ textAlign: 'left' })"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="toolbar/paragraph/alignleft" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                        <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                    </g>
                    <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M13,11.3 L13,12.7 L5,12.7 L5,11.3 L13,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                </g>
              </svg>
            </a-menu-item>
            <a-menu-item
              class="rich-editor-menu-item-dropdown-one-item"
              @mousedown.prevent="handleSetTextAlign('center')"
            >
              <svg
                class="select-icon"
                v-if="editor.isActive({ textAlign: 'center' })"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="toolbar/paragraph/aligncenter" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="_图标/工具栏/icon/居中对齐">
                        <rect id="Rectangle复制-23" fill="#000000" opacity="0" x="0" y="0" width="24" height="24"></rect>
                        <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M16,11.3 L16,12.7 L8,12.7 L8,11.3 L16,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                    </g>
                </g>
            </svg>
            </a-menu-item>
            <a-menu-item
              class="rich-editor-menu-item-dropdown-one-item"
              @mousedown.prevent="handleSetTextAlign('right')"
            >
              <svg
                class="select-icon"
                v-if="editor.isActive({ textAlign: 'right' })"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="toolbar/paragraph/alignright" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                        <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                    </g>
                    <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M19,11.3 L19,12.7 L11,12.7 L11,11.3 L19,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                </g>
              </svg>
            </a-menu-item>
            <a-menu-item
              class="rich-editor-menu-item-dropdown-one-item"
              @mousedown.prevent="handleSetTextAlign('justify')"
            >
              <svg
                class="select-icon"
                v-if="editor.isActive({ textAlign: 'justify' })"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g id="toolbar/paragraph/justify" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="_图标/工具栏/icon/左对齐" transform="translate(0.000000, 0.000000)" fill="#000000" opacity="0">
                          <rect id="Rectangle复制-23" x="-1.13686838e-13" y="0" width="24" height="24"></rect>
                      </g>
                      <path d="M19,16.6 L19,18 L5,18 L5,16.6 L19,16.6 Z M19,11.3 L19,12.7 L5,12.7 L5,11.3 L19,11.3 Z M19,6 L19,7.4 L5,7.4 L5,6 L19,6 Z" id="形状结合" fill="#464D5A"></path>
                  </g>
              </svg>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('bulletList')}" @mousedown.prevent="editor.chain().focus().toggleBulletList().run()">
          <img class="icon" src="./icons/bullet-list.svg">
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('orderedList')}" @mousedown.prevent="editor.chain().focus().toggleOrderedList().run()">
          <img class="icon" src="./icons/numbered-list.svg">
        </div>
        <div class="rich-editor-menu-item" :class="{active: editor.isActive('taskList')}" @mousedown.prevent="editor.chain().focus().toggleTaskList().run()">
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
        <!-- <div class="rich-editor-menu-item">
          <img class="icon" src="./icons/indent.svg">
        </div>
        <div class="rich-editor-menu-item">
          <img class="icon" src="./icons/inc-indent.svg">
        </div> -->
        <div class="rich-editor-menu-item">
          <split-line></split-line>
        </div>
        <div class="rich-editor-menu-item">
          <img class="icon" src="./icons/find-replace.svg">
        </div>
        <a-dropdown overlayClassName="rich-editor-menu-item-dropdown-four" :trigger="['hover']">
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
          <a-menu slot="overlay">
            <a-menu-item
              class="rich-editor-menu-item-dropdown-four-item"
            >
              <svg
                class="select-icon"
                v-if="markdown"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <span class="text">Markdown</span>
            </a-menu-item>
            <a-menu-item
              class="rich-editor-menu-item-dropdown-four-item"
            >
              <svg
                class="select-icon"
                v-if="spellcheck"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z" fill="#1e6fff" fill-rule="evenodd"/>
              </svg>
              <span class="text">拼写检查</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="rich-editor-paper" ref="richEditorPaperRef">
        <div class="rich-editor-paper-inner">
          <div class="rich-editor-paper-inner-head">
            <input :value="title" @input="e => $emit('update:title', e.target.value)" type="text" class="title-input" ref="titleInputRef" placeholder="请输入标题">
          </div>
          <div class="rich-editor-paper-inner-body">
            <editor-content
              class="rich-editor-paper-main"
              :autocapitalize="autocapitalize"
              :spellcheck="spellcheck"
              :editor="editor"
              :style="{'caret-color': this.currentFontColor}"
            >
            </editor-content>
          </div>
        </div>
      </div>
    </div>
    <div class="status-bar">
      <div class="status-bar-left">
        <div class="status-bar-item word-count">{{wordCount}}/{{limit}}个字</div>
      </div>
      <div class="status-bar-right">
        <div class="status-bar-item full-screen" @click="handleFullScreen"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import { Sketch as SketchPicker } from 'vue-color';
import BackgroundColor from './extensions/background-color';
import FontSize from './extensions/font-size';
import SplitLine from './split-line';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import { ColorHighlighter } from './ColorHighlighter'
import { SmilieReplacer } from './SmilieReplacer'
import { fontSize, titleType, fontFamily } from './config';
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      fontSize,
      titleType,
      fontFamily,
      textAlign: 'left',
      bgColor: {
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 0
        }
      },
      tableSize: {
        row: 10,
        column: 8
      },
      markdown: true,
      autocapitalize: false,
      spellcheck: false,
      // table
      mouseenter: false,
      table: {
        row: 0,
        column: 0
      },
      placeholder: '请输入文章内容...',
      limit: 100000
    };
  },
  components: {
    SplitLine,
    EditorContent,
    SketchPicker
  },
  computed: {
    wordCount() {
      return this.editor.getCharacterCount();
    },
    currentFontSize () {
      const fontSize = this.editor.getAttributes('textStyle').fontSize || this.fontSize.default;
      return this.fontSize.list.find(item => item.value === fontSize).name;
    },
    currentFontFamily () {
      const fontFamily = this.editor.getAttributes('textStyle').fontFamily || this.fontFamily.default;
      return this.fontFamily.list.find(item => item.value === fontFamily).name;
    },
    currentFontColor () {
      return this.editor.getAttributes('textStyle').color || 'rgba(1,1,1,1)';
    },
    currentBackgroundColor () {
      return this.editor.getAttributes('textStyle').backgroundColor || 'rgba(0,0,0,0)';
    },
    currentTitleType () {
      if (this.editor.isActive('heading', { level: 1 })) {
        return '标题1';
      } else if (this.editor.isActive('heading', { level: 2 })) {
        return '标题2';
      } else if (this.editor.isActive('heading', { level: 3 })) {
        return '标题3';
      } else if (this.editor.isActive('heading', { level: 4 })) {
        return '标题4';
      } else if (this.editor.isActive('heading', { level: 5 })) {
        return '标题5';
      } else if (this.editor.isActive('heading', { level: 6 })) {
        return '标题6';
      } else if (this.editor.isActive('paragraph')) {
        return '正文';
      }
      return '正文';
    },
    hasSelectedTableCell () {
      return this.table.row > 0 && this.table.column > 0;
    }
  },
  watch: {
    editor: {
      handler (newValue) {
        console.log('editor:', newValue);
      }
      // deep: true
    }
  },
  mounted () {
    this.$refs.titleInputRef && this.$refs.titleInputRef.focus();
    this.initEditor();
  },
  methods: {
    handleFocus () {
      if (this.editor.isFocused) return;
      this.editor && this.editor.commands.focus('end');
    },
    handleSetTextAlign (type) {
      this.textAlign = type;
      console.log('textAlign:', type);
      this.editor.chain().focus().setTextAlign(type).run();
    },
    handleInsert (type) {
      console.log('insert:', type);
      if (type === 'enter') {
        this.editor.chain().focus().setHardBreak().run();
      } else if (type === 'divider') {
        this.editor.chain().focus().setHorizontalRule().run();
      }
    },
    handleSetTitleType (type) {
      console.log('set title:', type);
      switch (type.name) {
        case '标题1':
          this.editor.chain().focus().toggleHeading({ level: 1 }).run();
          console.log(type.name);
          break;
        case '标题2':
          this.editor.chain().focus().toggleHeading({ level: 2 }).run();
          console.log(type.name);
          break;
        case '标题3':
          this.editor.chain().focus().toggleHeading({ level: 3 }).run();
          console.log(type.name);
          break;
        case '标题4':
          this.editor.chain().focus().toggleHeading({ level: 4 }).run();
          console.log(type.name);
          break;
        case '标题5':
          this.editor.chain().focus().toggleHeading({ level: 5 }).run();
          console.log(type.name);
          break;
        case '标题6':
          this.editor.chain().focus().toggleHeading({ level: 6 }).run();
          console.log(type.name);
          break;
        default:
          this.editor.chain().focus().setParagraph().run();
      }
    },
    handleSetFontBackgroundColor ({ rgba }) {
      console.log(this.editor.chain().focus());
      const { r, g, b, a } = rgba;
      const rgbaColor = `rgb(${r},${g},${b},${a})`;
      this.editor.chain().focus().setBackgroundColor(rgbaColor).run();
    },
    handleSetFontColor ({ rgba }) {
      const { r, g, b, a } = rgba;
      const rgbaColor = `rgb(${r},${g},${b},${a})`;
      this.editor.chain().focus().setColor(rgbaColor).run();
    },
    handleSetFontFamily (item) {
      this.editor.chain().focus().setFontFamily(item.value).run();
      console.log('set font family:', item);
    },
    handleSetFontSize (item) {
      this.editor.chain().focus().setFontSize(item.value).run();
      console.log('set font size:', item);
    },
    handleMouseenter () {
      this.mouseenter = true;
    },
    handleMouseleave () {
      this.mouseenter = false;
      this.table.row = 0;
      this.table.column = 0;
    },
    handleSelectedTableCell () {
      console.log('table', this.table.row, this.table.column);
    },
    handleMousemove (e) {
      if (this.mouseenter) {
        if (e.target.dataset.position) {
          const [row, column] = e.target.dataset.position.split('|');
          this.table.row = row;
          this.table.column = column;
        }
      }
    },
    initEditor () {
      const vm = this;
      this.editor = new Editor({
        content: vm.value,
        onUpdate () {
          const html = this.getHTML();
          vm.$emit('input', html);
        },
        extensions: [
          StarterKit,
          TaskList,
          TaskItem,
          TextAlign.configure({
            types: ['heading', 'paragraph']
          }),
          Underline,
          TextStyle,
          Color,
          BackgroundColor,
          FontFamily,
          FontSize,
          Placeholder.configure({
            placeholder: vm.placeholder
          }),
          CharacterCount.configure({
            limit: this.limit,
          }),
          Typography,
          ColorHighlighter,
          SmilieReplacer,
        ]
      });
    },
    handleFullScreen() {
      this.$refs.richEditorPaperRef.requestFullscreen();
    }
  },
  beforeDestroy () {
    this.editor.destroy();
  }
};
</script>

<style style lang="scss" scoped>
.rich-editor-paper {
  position: fixed;
  left: 0;
  right: 0;
  top: 64px;
  top: 150px;
  bottom: 40px;
  overflow: auto;
  &-inner {
    width: 790px;
    min-height: 1120px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    &-head {
      padding: 100px 90px 10px;
    }
    &-body {
      min-height: calc(100% - 164px);
    }
    .title-input {
      color: #000;
      border: 0;
      outline: 0;
      font-size: 36px;
      font-weight: bold;
      display: block;
      padding: 0;
      width: 100%;
      caret-color: #1890ff;
      &::placeholder {
        color: #ccc
      }
    }
  }
  &-main {
    height: 100%;
    /deep/ {
      .ProseMirror {
        word-break: break-all;
        padding: 0 90px 20px;
        height: 100%;
        font-size: 16px;
        color: #000;
        font-family: "Helvetica Neue, Helvetica, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif";
        p {
          margin: 0;
        }
        &.ProseMirror-focused {
          outline: none;
        }
        p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #ced4da;
          pointer-events: none;
          height: 0;
        }
      }
      .color {
        white-space: nowrap;

        &::before {
          content: ' ';
          display: inline-block;
          width: 1em;
          height: 1em;
          border: 1px solid rgba(128, 128, 128, 0.3);
          vertical-align: middle;
          margin-right: 0.1em;
          margin-bottom: 0.15em;
          border-radius: 2px;
          background-color: var(--color);
        }
      }
      ul[data-type="taskList"] {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          > label {
            flex: 0 0 auto;
            margin-right: 0.5em;
          }
          p {
            margin: 0;
          }
        }
      }
    }
  }
}
.rich-editor-menu {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 8px 0;
  color: rgba(0, 0,0,.8);
  border-top: 1px solid rgba(0, 0, 0, .04);
  border-bottom: 1px solid rgba(0, 0, 0, .04);
  background: #f9fafb;
  &-item {
    height: 30px;
    margin: 0 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    transition: background .18s;
    border-radius: 3px;
    &:not(.disabled):hover {
      background: rgba(0, 0, 0, 0.04);
    }
    &.active {
      background: rgba(0, 0, 0, 0.04);
    }
    &.disabled {
      cursor: no-drop;
      opacity: .2;
    }
    .picker-color {
      .current-color {
        width: 14px;
        height: 3px;
        background: red;
        margin: -8px auto 0;
      }
    }
    .caret {
      font-size: 10px;
      color: rgba(0, 0,0,.4);
      padding-left: 6px;
    }
    .icon {
      display: block;
    }
  }
}
.status-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  background-color: #f0f0f0;
  border-top: solid #e4e4e4 1px;
  &-left {}
  &-right {}
  &-item {
    transition: background .18s;
    &:hover {
      padding: 2px;
      background-color: rgba(0, 0, 0, 0.04) !important;
    }
    &.full-screen {
      cursor: pointer;
      width: 26px;
      height: 26px;
      background: url('./icons/full-screen.svg') no-repeat;
      background-size: contain;
    }
  }
}

</style>
<style lang="scss">
@mixin scrollbar {
  &::-webkit-scrollbar {
      width: 4px;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #c8cbcc;
      border-radius: 2px;
  }
  &::-webkit-scrollbar-track-piece {
      background-color: transparent;
  }
}

.rich-editor-menu-item-dropdown-one {
  padding-top: 2px;
  .ant-dropdown-menu {
    max-height: 300px;
    overflow: auto;
    @include scrollbar;
    &-item {
      width: 80px;
      text-align: center;
    }
  }
  .rich-editor-menu-item-dropdown-one-item {
    position: relative;
    .select-icon {
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }
}
.rich-editor-menu-item-drapdown-two {
  padding-top: 2px;
  &-item {
    background: #fff !important;
    .vc-sketch {
      border: 0;
      padding: 0;
      box-shadow: none;
      .vc-sketch-presets {
        white-space: normal;
      }
    }
  }
}
.rich-editor-menu-item-dropdown-three {
  padding-top: 2px;
  .ant-dropdown-menu-submenu-title {
    .ant-dropdown-menu-submenu-arrow {
      top: 3px;
    }
  }
  .table-size {
    &-body {
      margin-top: 5px;
      .row {
        display: flex;
        margin-top: 3px;
        margin-right: -3px;
        .box {
          width: 12px;
          height: 12px;
          border: 1px solid #66b1ff;
          margin-right: 3px;
          transition: background .18s;
          &.selected {
            background: #d5ecff;
          }
        }
      }
    }
    &-foot {
      margin-top: 5px;
      transition: background .18s;
      font-size: 12px;
      line-height: 1.1;
      padding: 2px;
      &:hover {
        background: #d5ecff;
      }
    }
  }
  .dropdown-menu-item-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    font-family: "PingFang SC", "Microsoft YaHei", 黑体, 宋体, sans-serif;
    font-size: 12px;
    &-left {
      display: flex;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.rich-editor-menu-item-dropdown-four {
  padding-top: 2px;
  .ant-dropdown-menu {
    max-height: 300px;
    overflow: auto;
    @include scrollbar;
    &-item {
      width: 120px;
      padding-left: 30px;
      text-align: left;
    }
  }
  .rich-editor-menu-item-dropdown-four-item {
    position: relative;
    .select-icon {
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }
}
</style>
