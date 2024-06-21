document.addEventListener('DOMContentLoaded', (event) => {
    const puzzleContainer = document.getElementById('puzzle-container');
    let imgArray = ["img/範例圖片1.png", "img/範例圖片2.png", "img/範例圖片3.png", "img/範例圖片4.png", "img/範例圖片5.png", "img/範例圖片6.png", "img/範例圖片11.gif", "img/範例圖片12.gif"];
    let imageUrl = imgArray[0]; // 替换为你的图片路径

    // 隨機抽取一個陣列元素
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const uploadInput = document.getElementById('upload');
    let puzzlePieces = Array.from({ length: 8 }, (_, i) => i + 1);
    puzzlePieces.push(null); // 空白塊

    uploadInput.addEventListener('change', handleImageUpload);

    // 處理圖片上傳
    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            shuffle(puzzlePieces);
            createPieces();
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // 處理圖片上傳
    $('#RandomButton').click(function () {
        imageUrl = getRandomElement(imgArray); // 替换为你的图片路径

        shuffle(puzzlePieces);
        createPieces();
    });

    shuffle(puzzlePieces);

    createPieces();

    // 打亂拼圖塊
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 创建拼图块
    function createPieces() {
        puzzleContainer.innerHTML = '';
        puzzlePieces.forEach((number, index) => {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            if (number === null) {
                piece.classList.add('empty');
            } else {
                // piece.textContent = number;
                piece.style.backgroundImage = `url(${imageUrl})`;
                const row = Math.floor((number - 1) / 3);
                const col = (number - 1) % 3;
                piece.style.backgroundPosition = `-${col * 200}px -${row * 200}px`;
            }
            piece.dataset.index = index;
            puzzleContainer.appendChild(piece);
        });
    }

    puzzleContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('puzzle-piece') && !e.target.classList.contains('empty')) {
            movePiece(e.target);
        }
    });

    //點擊方塊移動事件
    function movePiece(piece) {
        const pieceIndex = parseInt(piece.dataset.index);

        // 找到空白塊的索引
        let emptyIndex;
        puzzlePieces.forEach((value, index) => {
            if (value === null) {
                emptyIndex = index;
            }
        });


        const [pieceRow, pieceCol] = [Math.floor(pieceIndex / 3), pieceIndex % 3];
        const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 3), emptyIndex % 3];

        const distance = Math.abs(pieceRow - emptyRow) + Math.abs(pieceCol - emptyCol);

        if (distance === 1) {
            // 交換拼圖塊
            [puzzlePieces[pieceIndex], puzzlePieces[emptyIndex]] = [puzzlePieces[emptyIndex], puzzlePieces[pieceIndex]];

            createPieces();
        }
    }
});