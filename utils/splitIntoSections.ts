export {}

let list = [
  "heading",
  "p",
  "p",
  "p",
  "p",
  "heading",
  "p",
  "p",
  "heading",
  "p",
  "heading",
  "p",
  "p",
  "p",
]

let findFirstHeading = list => list.findIndex(el => el === "heading")

let splitIntoSections = list => {
  let startIndex = findFirstHeading(list)
  let endIndex = findFirstHeading(list.slice(startIndex + 1))

  let restOfList = endIndex > -1 ? list.slice(endIndex + 1, list.length) : null
  console.log({ startIndex, endIndex, restOfList })
  return restOfList
    ? [list.slice(startIndex, endIndex + 1), ...splitIntoSections(restOfList)]
    : [list]
}

console.log(splitIntoSections(list))

/*---------------------------
let list = ["heading1", "1", "1", "heading2", "1-1", "1-1", "heading3", "1-1-1", "heading3", "1-1-2", "1-1-2", "heading2", "1-2", "1-2", "heading1", "heading2", "2-1", "heading2", "2-2", "heading1", "3", "heading1", "4", "4", "4"]

let findFirstHeading = (list, level) => list.findIndex(el => new RegExp(`heading${level}`).test(el))

let splitIntoSections = (list, level) => {
  let startIndex = findFirstHeading(list, level)

  if (startIndex === -1) {
    return list
  } else {

    // Note: while this might seem overcomplicated, it is due to prevent bug, when findIndex returns -1, then adding startIndex + 1 will give a faulty value.
    let endIndex =
      findFirstHeading(list.slice(startIndex + 1), level) === -1 ?
      -1 :
      findFirstHeading(list.slice(startIndex + 1), level) + startIndex + 1

    let precedingList = list.slice(0, startIndex)
    let restOfList = endIndex > -1 ? list.slice(endIndex) : null

    return restOfList ? [...precedingList,
      splitIntoSections(list.slice(startIndex, endIndex), level + 1),
      ...splitIntoSections(restOfList, level)
    ] : [list]
  }
}

//console.log(JSON.stringify(splitIntoSections(list, 1), null, 2))
test.insertAdjacentHTML("afterbegin", `<pre>${JSON.stringify(splitIntoSections(list, 1), null, 2)}</pre>`)
*/
