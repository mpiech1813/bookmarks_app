const express = require('express')
const app = express()
const path = require('path')
const {db, tabels:{Category, Entry}} = require ('./db')



app.get('/', async(req, res, next) => {
  try{
    const categories = await Category.findAll()
    const entries = await Entry.findAll()
    const entDetail= async (entry) =>{ await Entry.findAll({
      where: {
        categoryId: entry}})}
    // const entDetail= await Entry.findAll({
    //   where: {
    //     categoryId: elem.id}})
    res.send(
      `
      <html>
        <head>
          <link rel='stylesheet' href='' />
        </head>
        <body>
          <div>
            <h1>Bookmarks (${entries.length})</h1>
            <div> 
              <ul>
                ${categories.map( elem =>
                  `
                  <li>
                  <a href='./${elem.category}'>
                    ${elem.category} (${entDetail(elem.id).length})
                  </a>      
                  </li>
                  `
                  ).join('')}
              </ul>
            </div>
          </div>
        </body>
      </html>
      `
    )
  }catch(err) {
    next(err)
  }
})

app.get('/:id', async (req, res, next)=>{
  try {
    const idParam = req.params.id
    
    const id = await Category.findAll(
      {include: [{
        model: Entry,
        right: true}],
      where: {
        category: idParam,
      }} ///entry.findByPk
    
    )
    // const entries = await Entry.findAll({
    //   where: {
    //     categoryId: [id]
    //   }
    // })
    res.send(
      `
      <html>
        <head>
          <link rel='stylesheet' href='' />
        </head>
        <body>
          <div>
            <h1>Bookmarks (###)</h1>
            <div> 
              <ul>
              ${id.map(elem=>
                `
                <li>
                  ${elem.entries[0].siteName} @ ${elem.entries[0].siteURL}
                </li>
                `
                )}

              </ul>
              <!--<p><${JSON.stringify(id[0].entries[0].siteName, null, 2)}/p> can use ig.get() maybe?-->
            </div>
          </div>
        </body>
      </html>
      `
    )
    
  }catch(err){
    next(err)
  }
})



const init = async () => {
  try {
    await db.sync({ force: true });

    const entertainment = new Category({
      category: 'entertainment',
    });

    const communication = new Category ({
      category: 'communication'
    })

    await communication.save()
    await entertainment.save();    

    const netflix = new Entry({
      siteName: 'NetFlix',
      siteURL: 'www.netflix.com',
      categoryId: entertainment.id,
    });
    
    const hulu = new Entry({
      siteName: 'HuLu',
      siteURL: 'www.hulu.com',
      categoryId: entertainment.id,
    });
  
    const gmail = new Entry({
      siteName: 'GMail',
      siteURL: 'www.gmail.com',
      categoryId: communication.id,
    })

    await Promise.all([netflix.save(), hulu.save(), gmail.save()]);

    
    // const port = process.env.PORT || 1813
    // app.listen(port, () => console.log(`listening on port ${port}`))
    // await db.close();
  } catch (err) {
    console.log(err)
  }
};

init();
const PORT = 1813;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});