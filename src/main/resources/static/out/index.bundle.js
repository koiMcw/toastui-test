/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/main/resources/static/common.js ***!
  \*********************************************/


 function initGrid() {
    const Grid = tui.Grid;
    Grid.applyTheme('stripe');
    /**
     * 그리드 설정
     * @variable {Dom} el : 그리드 element(DOM)
     * @variable {boolean} scrollX : X 스크롤 사용여부
     * @variable {boolean} scrollY : Y 스크롤 사용여부
     * @variable {boolean} draggable : 드레그 사용 여부
     * @variable {Object} header
     *      - @variable {Number} height : 헤더 높이
     * @variable {Number} bodyHeight : 그리드 바디 높이
     * @variable {*} contextMenu : 마우스 우클릭 옵션
     * @variable {Array} columns :
     *      - @variable {String} header : 컬럼명(헤더)
     *      - @variable {String} name : 컬럼 name (input data와 이름이 일치해야함)
     *      - @variable {String} align : 정렬
     *      - @variable {Number} width : 너비
     *      - @variable {String} whiteSpace : 줄바꿈 설정
     *      - @variable {Function} formatter : 출력 포멧
     */
    let dataSource = {
        initialRequest: true,
        api: {
            readData: {
                url: '/api/users',      // 서버 URL
                method: 'GET'           // HTTP 메서드
            }
        },
    }
    let grid = new Grid({
        el: document.getElementById('grid'),
        data: dataSource,
        scrollX: false,
        scrollY: false,
        columns: [
            {header: 'ID', name: 'id', sortable: true},
            {header: 'Name', name: 'name', sortable: true},
            {header: 'Email', name: 'email', sortable: true},
            {header: 'Gender', name: 'gender', sortable: true},
            {header: 'Age', name: 'age', sortable: true},
            {header: 'Hobby', name: 'hobby', sortable: true}
        ],
        summary: {
            height: 40,
            position: 'bottom',
            columnContent: {
                userHobby: {
                    template: (valueMap) => {
                        return `사용자 합계 : ${valueMap.cnt}`
                    }
                }
            }
        },
        pageOptions: {
            perPage: 10
        },
    });
     // 검색 버튼 이벤트 리스너
     document.getElementById('searchButton').addEventListener('click', () => {
         const keyword = document.getElementById('searchInput').value.trim();
         grid.readData(1, keyword); // 검색어와 함께 첫 페이지 데이터 요청
     });

     grid.on('response',(event)=>{
        const data = JSON.parse(event.xhr.responseText);
        console.log(event.xhr.responseText);
    });

}
 /**
  * Toast UI Editor 작성
  *
  * @param {string} selector - 에디터를 렌더링할 DOM 선택자
  * @param {Object} options - 에디터에 적용될 옵션
  * [options]
  * el : 에디터가 렌더링될 DOM 요소
  * previewStyle : 미리보기 스타일('vertical','tab')
  * height : 에디터의 높이
  * initialEditType : 초기 편집 모드(markdown 또는 wysiwyg)
  * initialValue : 에디터에 로드될 초기 내용
  * toolbarItems : 툴바에 표시할 도구 목록
  * placeholder : 에디터 입력 없을 시 표시될 텍스트
  * hooks : 특정 이벤트에서 실행할 사용자 정의 함수
  * language : 에디터의 언어 설정(ko,en ..)
  * viewer : 에디터를 읽기 전용 뷰어로 설정
  * events : 에디터에서 발생하는 이벤트를 처리할 리스너
  * useCommandShortcut : 명령어 단축키 사용 여부
  */
function createEditor(selector, options){
    const defaultOptions = {
        el: document.querySelector(selector), // 에디터를 렌더링할 DOM 선택자
        previewStyle: 'vertical',
        height: '500px',
        initialValue: '',
        placeholder: '내용을 입력해 주세요',
        toolbarItems: [
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
            ['scrollSync'],
        ],
        hooks: {
            async addImageBlobHook(blob, callback) {
                try {
                    const formData = new FormData();
                    formData.append('image', blob);
                    const response = await fetch('/api/image-upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const filename = await response.text();
                    console.log('서버에 저장된 파일명 : ', filename);

                    const imageUrl = `/api/image-print?filename=${filename}`;
                    callback(imageUrl, 'image alt attribute');
                } catch (error) {
                    console.error('업로드 실패 : ' + error);
                }
            },
        },
    };

    // 사용자 정의 옵션과 기본 옵션을 병합( 우선 순위 : options > defaultOptions )
    const mergedOptions = { ...defaultOptions, ...options };
    // 에디터 생성
    return new toastui.Editor(mergedOptions);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixLQUFLO0FBQ3ZCLGtCQUFrQixTQUFTO0FBQzNCLGtCQUFrQixTQUFTO0FBQzNCLGtCQUFrQixTQUFTO0FBQzNCLGtCQUFrQixRQUFRO0FBQzFCLHlCQUF5QixRQUFRO0FBQ2pDLGtCQUFrQixRQUFRO0FBQzFCLGtCQUFrQixHQUFHO0FBQ3JCLGtCQUFrQixPQUFPO0FBQ3pCLHlCQUF5QixRQUFRO0FBQ2pDLHlCQUF5QixRQUFRO0FBQ2pDLHlCQUF5QixRQUFRO0FBQ2pDLHlCQUF5QixRQUFRO0FBQ2pDLHlCQUF5QixRQUFRO0FBQ2pDLHlCQUF5QixVQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlDQUF5QztBQUN0RCxhQUFhLDZDQUE2QztBQUMxRCxhQUFhLCtDQUErQztBQUM1RCxhQUFhLGlEQUFpRDtBQUM5RCxhQUFhLDJDQUEyQztBQUN4RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsYUFBYTtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsU0FBUztBQUMzRTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYy9jb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4gZnVuY3Rpb24gaW5pdEdyaWQoKSB7XHJcbiAgICBjb25zdCBHcmlkID0gdHVpLkdyaWQ7XHJcbiAgICBHcmlkLmFwcGx5VGhlbWUoJ3N0cmlwZScpO1xyXG4gICAgLyoqXHJcbiAgICAgKiDqt7jrpqzrk5wg7ISk7KCVXHJcbiAgICAgKiBAdmFyaWFibGUge0RvbX0gZWwgOiDqt7jrpqzrk5wgZWxlbWVudChET00pXHJcbiAgICAgKiBAdmFyaWFibGUge2Jvb2xlYW59IHNjcm9sbFggOiBYIOyKpO2BrOuhpCDsgqzsmqnsl6zrtoBcclxuICAgICAqIEB2YXJpYWJsZSB7Ym9vbGVhbn0gc2Nyb2xsWSA6IFkg7Iqk7YGs66GkIOyCrOyaqeyXrOu2gFxyXG4gICAgICogQHZhcmlhYmxlIHtib29sZWFufSBkcmFnZ2FibGUgOiDrk5zroIjqt7gg7IKs7JqpIOyXrOu2gFxyXG4gICAgICogQHZhcmlhYmxlIHtPYmplY3R9IGhlYWRlclxyXG4gICAgICogICAgICAtIEB2YXJpYWJsZSB7TnVtYmVyfSBoZWlnaHQgOiDtl6TrjZQg64aS7J20XHJcbiAgICAgKiBAdmFyaWFibGUge051bWJlcn0gYm9keUhlaWdodCA6IOq3uOumrOuTnCDrsJTrlJQg64aS7J20XHJcbiAgICAgKiBAdmFyaWFibGUgeyp9IGNvbnRleHRNZW51IDog66eI7Jqw7IqkIOyasO2BtOumrSDsmLXshZhcclxuICAgICAqIEB2YXJpYWJsZSB7QXJyYXl9IGNvbHVtbnMgOlxyXG4gICAgICogICAgICAtIEB2YXJpYWJsZSB7U3RyaW5nfSBoZWFkZXIgOiDsu6zrn7zrqoUo7Zek642UKVxyXG4gICAgICogICAgICAtIEB2YXJpYWJsZSB7U3RyaW5nfSBuYW1lIDog7Lus65+8IG5hbWUgKGlucHV0IGRhdGHsmYAg7J2066aE7J20IOydvOy5mO2VtOyVvO2VqClcclxuICAgICAqICAgICAgLSBAdmFyaWFibGUge1N0cmluZ30gYWxpZ24gOiDsoJXroKxcclxuICAgICAqICAgICAgLSBAdmFyaWFibGUge051bWJlcn0gd2lkdGggOiDrhIjruYRcclxuICAgICAqICAgICAgLSBAdmFyaWFibGUge1N0cmluZ30gd2hpdGVTcGFjZSA6IOykhOuwlOq/iCDshKTsoJVcclxuICAgICAqICAgICAgLSBAdmFyaWFibGUge0Z1bmN0aW9ufSBmb3JtYXR0ZXIgOiDstpzroKUg7Y+s66mnXHJcbiAgICAgKi9cclxuICAgIGxldCBkYXRhU291cmNlID0ge1xyXG4gICAgICAgIGluaXRpYWxSZXF1ZXN0OiB0cnVlLFxyXG4gICAgICAgIGFwaToge1xyXG4gICAgICAgICAgICByZWFkRGF0YToge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VycycsICAgICAgLy8g7ISc67KEIFVSTFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyAgICAgICAgICAgLy8gSFRUUCDrqZTshJzrk5xcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBsZXQgZ3JpZCA9IG5ldyBHcmlkKHtcclxuICAgICAgICBlbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQnKSxcclxuICAgICAgICBkYXRhOiBkYXRhU291cmNlLFxyXG4gICAgICAgIHNjcm9sbFg6IGZhbHNlLFxyXG4gICAgICAgIHNjcm9sbFk6IGZhbHNlLFxyXG4gICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAge2hlYWRlcjogJ0lEJywgbmFtZTogJ2lkJywgc29ydGFibGU6IHRydWV9LFxyXG4gICAgICAgICAgICB7aGVhZGVyOiAnTmFtZScsIG5hbWU6ICduYW1lJywgc29ydGFibGU6IHRydWV9LFxyXG4gICAgICAgICAgICB7aGVhZGVyOiAnRW1haWwnLCBuYW1lOiAnZW1haWwnLCBzb3J0YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgICAgIHtoZWFkZXI6ICdHZW5kZXInLCBuYW1lOiAnZ2VuZGVyJywgc29ydGFibGU6IHRydWV9LFxyXG4gICAgICAgICAgICB7aGVhZGVyOiAnQWdlJywgbmFtZTogJ2FnZScsIHNvcnRhYmxlOiB0cnVlfSxcclxuICAgICAgICAgICAge2hlYWRlcjogJ0hvYmJ5JywgbmFtZTogJ2hvYmJ5Jywgc29ydGFibGU6IHRydWV9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdW1tYXJ5OiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcclxuICAgICAgICAgICAgY29sdW1uQ29udGVudDoge1xyXG4gICAgICAgICAgICAgICAgdXNlckhvYmJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICh2YWx1ZU1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYOyCrOyaqeyekCDtlanqs4QgOiAke3ZhbHVlTWFwLmNudH1gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWdlT3B0aW9uczoge1xyXG4gICAgICAgICAgICBwZXJQYWdlOiAxMFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgICAvLyDqsoDsg4kg67KE7Yq8IOydtOuypO2KuCDrpqzsiqTrhIhcclxuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoQnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoSW5wdXQnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgIGdyaWQucmVhZERhdGEoMSwga2V5d29yZCk7IC8vIOqygOyDieyWtOyZgCDtlajqu5gg7LKrIO2OmOydtOyngCDrjbDsnbTthLAg7JqU7LKtXHJcbiAgICAgfSk7XHJcblxyXG4gICAgIGdyaWQub24oJ3Jlc3BvbnNlJywoZXZlbnQpPT57XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQueGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQueGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuIC8qKlxyXG4gICogVG9hc3QgVUkgRWRpdG9yIOyekeyEsVxyXG4gICpcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIOyXkOuUlO2EsOulvCDroIzrjZTrp4HtlaAgRE9NIOyEoO2DneyekFxyXG4gICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDsl5DrlJTthLDsl5Ag7KCB7Jqp65CgIOyYteyFmFxyXG4gICogW29wdGlvbnNdXHJcbiAgKiBlbCA6IOyXkOuUlO2EsOqwgCDroIzrjZTrp4HrkKAgRE9NIOyalOyGjFxyXG4gICogcHJldmlld1N0eWxlIDog66+466as67O06riwIOyKpO2DgOydvCgndmVydGljYWwnLCd0YWInKVxyXG4gICogaGVpZ2h0IDog7JeQ65SU7YSw7J2YIOuGkuydtFxyXG4gICogaW5pdGlhbEVkaXRUeXBlIDog7LSI6riwIO2OuOynkSDrqqjrk5wobWFya2Rvd24g65iQ64qUIHd5c2l3eWcpXHJcbiAgKiBpbml0aWFsVmFsdWUgOiDsl5DrlJTthLDsl5Ag66Gc65Oc65CgIOy0iOq4sCDrgrTsmqlcclxuICAqIHRvb2xiYXJJdGVtcyA6IO2ItOuwlOyXkCDtkZzsi5ztlaAg64+E6rWsIOuqqeuhnVxyXG4gICogcGxhY2Vob2xkZXIgOiDsl5DrlJTthLAg7J6F66ClIOyXhuydhCDsi5wg7ZGc7Iuc65CgIO2FjeyKpO2KuFxyXG4gICogaG9va3MgOiDtirnsoJUg7J2067Kk7Yq47JeQ7IScIOyLpO2Wie2VoCDsgqzsmqnsnpAg7KCV7J2YIO2VqOyImFxyXG4gICogbGFuZ3VhZ2UgOiDsl5DrlJTthLDsnZgg7Ja47Ja0IOyEpOyglShrbyxlbiAuLilcclxuICAqIHZpZXdlciA6IOyXkOuUlO2EsOulvCDsnb3quLAg7KCE7JqpIOu3sOyWtOuhnCDshKTsoJVcclxuICAqIGV2ZW50cyA6IOyXkOuUlO2EsOyXkOyEnCDrsJzsg53tlZjripQg7J2067Kk7Yq466W8IOyymOumrO2VoCDrpqzsiqTrhIhcclxuICAqIHVzZUNvbW1hbmRTaG9ydGN1dCA6IOuqheugueyWtCDri6jstpXtgqQg7IKs7JqpIOyXrOu2gFxyXG4gICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUVkaXRvcihzZWxlY3Rvciwgb3B0aW9ucyl7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgICBlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksIC8vIOyXkOuUlO2EsOulvCDroIzrjZTrp4HtlaAgRE9NIOyEoO2DneyekFxyXG4gICAgICAgIHByZXZpZXdTdHlsZTogJ3ZlcnRpY2FsJyxcclxuICAgICAgICBoZWlnaHQ6ICc1MDBweCcsXHJcbiAgICAgICAgaW5pdGlhbFZhbHVlOiAnJyxcclxuICAgICAgICBwbGFjZWhvbGRlcjogJ+uCtOyaqeydhCDsnoXroKXtlbQg7KO87IS47JqUJyxcclxuICAgICAgICB0b29sYmFySXRlbXM6IFtcclxuICAgICAgICAgICAgWydoZWFkaW5nJywgJ2JvbGQnLCAnaXRhbGljJywgJ3N0cmlrZSddLFxyXG4gICAgICAgICAgICBbJ2hyJywgJ3F1b3RlJ10sXHJcbiAgICAgICAgICAgIFsndWwnLCAnb2wnLCAndGFzaycsICdpbmRlbnQnLCAnb3V0ZGVudCddLFxyXG4gICAgICAgICAgICBbJ3RhYmxlJywgJ2ltYWdlJywgJ2xpbmsnXSxcclxuICAgICAgICAgICAgWydjb2RlJywgJ2NvZGVibG9jayddLFxyXG4gICAgICAgICAgICBbJ3Njcm9sbFN5bmMnXSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGhvb2tzOiB7XHJcbiAgICAgICAgICAgIGFzeW5jIGFkZEltYWdlQmxvYkhvb2soYmxvYiwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ltYWdlJywgYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9pbWFnZS11cGxvYWQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn7ISc67KE7JeQIOyggOyepeuQnCDtjIzsnbzrqoUgOiAnLCBmaWxlbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlVXJsID0gYC9hcGkvaW1hZ2UtcHJpbnQ/ZmlsZW5hbWU9JHtmaWxlbmFtZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlVXJsLCAnaW1hZ2UgYWx0IGF0dHJpYnV0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfsl4XroZzrk5wg7Iuk7YyoIDogJyArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDsgqzsmqnsnpAg7KCV7J2YIOyYteyFmOqzvCDquLDrs7gg7Ji17IWY7J2EIOuzke2VqSgg7Jqw7ISgIOyInOychCA6IG9wdGlvbnMgPiBkZWZhdWx0T3B0aW9ucyApXHJcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0geyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xyXG4gICAgLy8g7JeQ65SU7YSwIOyDneyEsVxyXG4gICAgcmV0dXJuIG5ldyB0b2FzdHVpLkVkaXRvcihtZXJnZWRPcHRpb25zKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=