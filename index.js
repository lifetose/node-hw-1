// Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.
// Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.

const path = require('node:path')
const fsPromises = require('node:fs/promises')

const foo = async () => {
  const baseFolder = path.join(__dirname, 'baseFolder')

  try {
    await fsPromises.mkdir(baseFolder, { recursive: true })

    for (let i = 1; i <= 5; i++) {
      const folderPath = path.join(baseFolder, `folder${i}`)
      await fsPromises.mkdir(folderPath)

      for (let j = 1; j <= 5; j++) {
        const filePath = path.join(folderPath, `file${j}.txt`)
        await fsPromises.writeFile(filePath, `Content of file${j}.txt`)
      }
    }

    const items = await fsPromises.readdir(baseFolder, { withFileTypes: true })

    for (const folder of items) {
      const folderPath = path.join(baseFolder, folder.name)

      console.log(`Path: ${folderPath}`)
      console.log(`Type: ${folder.isDirectory() ? 'Folder' : 'File'}`)

      if (folder.isDirectory()) {
        const folderContent = await fsPromises.readdir(folderPath, {
          withFileTypes: true,
        })

        for (const file of folderContent) {
          const filePath = path.join(folderPath, file.name)

          console.log(`Path: ${filePath}`)
          console.log(`Type: ${file.isFile() ? 'File' : 'Folder'}`)
        }
      }
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

foo()
