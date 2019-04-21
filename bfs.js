function BreadthFirsh(map, s, t) {
    var start = { row: s[0], col: s[1] } //จุดเริ่มต้น
    var target = { row: t[0], col: t[1] } //เป้าหมาย
    var current = { row: start.row, col: start.col } //ตำแหน่งปัจจุบัน
    var path = [] //เส้นทางที่เดินทาง
    var queue = [] //คิวที่รอเดินทาง
    var pathIndex = 0 //index ของ path
    var node = [[current.row, current.col]] // เก็บค่า node ทั้งหมดตามลำดับการคิดของ Breadth-First Search
    var parent_node = [[-1, -1]] // กำหนดให้ vertex node มี parent เป็นตำแหน่ง [-1, -1] 

    map[current.row][current.col] = 3 // ทำสัญลักษณ์ให้จุดปัจจุบัน

    path.push([current.row, current.col]) //เก็บตำแหน่งปัจจุบันไว้ใน path

    while (true) {
        //ดึงพิกัดปัจจุบันมาจาก path
        current.row = path[pathIndex][0]
        current.col = path[pathIndex][1]
        //index ของ path เพิ่มขึ้นเพื่อใช้ในรอบถัดไป
        pathIndex += 1
        //ตรวจสอบว่าตำแหน่งปัจจุบันใช่เป้าหมายหรือไม่ ถ้าใช้แสดงผลลัพธ์ และ break
        if (current.row == target.row && current.col == target.col) {
            break
        }
        //ถ้าไม่ใช่ ตรวจสอบทั้ง 4 ทิศรอบตัว หาพื้นที่ว่างเพื่อเพิ่มเข้าไปใน queue
        else {
            //ทิศบน
            if (map[current.row - 1][current.col] == 0) {
                queue.push([current.row - 1, current.col])
                node.push([current.row - 1, current.col])
                parent_node.push([current.row, current.col])
            }
            //ทิศซ้าย
            if (map[current.row][current.col - 1] == 0) {
                queue.push([current.row, current.col - 1])
                node.push([current.row, current.col - 1])
                parent_node.push([current.row, current.col])
            }
            //ทิศล่าง
            if (map[current.row + 1][current.col] == 0) {
                queue.push([current.row + 1, current.col])
                node.push([current.row + 1, current.col])
                parent_node.push([current.row, current.col])
            }
            //ทิศขวา
            if (map[current.row][current.col + 1] == 0) {
                queue.push([current.row, current.col + 1])
                node.push([current.row, current.col + 1])
                parent_node.push([current.row, current.col])
            }
            //ตรวจสอบว่ายังมี queue และนำ queue แรกสุดเก็บใน path เพื่อเดินทางไป ในรอบถัดไป
            if (queue[0]) {
                next = queue.shift()
                path.push(next)
                map[next[0]][next[1]] = 3
            } else {
                break
            }
        }
    }

    var child = [target.row, target.col] // Array ของ child 
    var result_path = [[target.row, target.col]] // path ทางเดินจาก start->target

    while (true) {
        for (var i = 0; i < node.length; i++) {

            // หาตำแหน่งของ child ว่าอยู่ตำแหน่งที่เท่าไหร่ใน node ทั้งหมด
            if (child[0] == node[i][0] && child[1] == node[i][1]) {

                child = parent_node[i] // นำ parent มาเป็น child เพื่อหา parent ที่สูงกว่า
                result_path.unshift(child)  // นำ child ใหม่มาเก็บไว้ใน result_path เพื่อรวบรวมเส้นทาง

                // เทียบว่า child นั้น ใช่ vertex node หรือไม่
                if (child[0] == -1 && child[1] == -1) {
                    result_path.shift() // เอา [-1, -1] ออกจากเส้นทาง

                    // สร้าง map เริ่มต้น
                    for (var i = 0; i < map.length; i++) {
                        for (var j = 0; j < map[i].length; j++) {
                            if (map[i][j] == 3) {
                                map[i][j] = 0
                            }
                        }
                    }
                    // เส้นทางผ่านถูกแทนด้วยเลข 3
                    for (var k = 0; k < result_path.length; k++) {
                        map[result_path[k][0]][result_path[k][1]] = 3
                    }

                    map[start.row][start.col] = 2 // จุดเริ่มต้นถูกแทนด้วยเลข 2
                    map[target.row][target.col] = 4 // เป้าหมายถูกแทนด้วยเลข 4

                    // return map ที่วาดใหม่ และ Shortest path จากจุดเริ่มต้น ถึง เป้าหมาย
                    return [map, result_path] 
                }
            }
        }
    }
}

var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
var start = [1, 1]
var target = [12, 11]

console.log(BreadthFirsh(map, start, target))