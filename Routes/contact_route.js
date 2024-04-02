const {Router} = require("express");
const CONTACT_SCHEMA = require("../models/contactSchema")
const router = Router();


router.get("/create-contact",(req,res)=>{
    res.render("contacts/create-contact",{title:"creating contact list"})
})


router.get("/:id",async (req,res)=>{

    let payload = await CONTACT_SCHEMA.findOne({_id:req.params.id}).lean();

    res.render("contacts/contact-detail",{title:"contact detail",payload});
    
})

router.post("/create-contact",async (req,res)=>{
    // res.send("checking post is working or not")
    await CONTACT_SCHEMA.create(req.body);
    res.redirect("/",302,{});
})


//! edit 

router.get("/edit-contact/:id", async (req, res) => {
    let editPayload = await CONTACT_SCHEMA.findOne({_id: req.params.id,}).lean();
    res.render("contacts/edit-contact", { title: "edit contacts", editPayload });
  });


  router.put("/edit-contact/:id", async (req,res)=>{
    try{
        let editPayload = await CONTACT_SCHEMA.findOne({_id: req.params.id});
        editPayload.name = req.body.name;
        editPayload.contact = req.body.contact


        editPayload.save();
        res.redirect("/", 302, {});

    }catch(err)
    {
        console.log(err)
    }
  })


  //! delete 

  router.delete("/delete-contact/:id",async(req,res)=>{
    await CONTACT_SCHEMA.deleteOne({_id: req.params.id})

    res.redirect("/",302,{})

  })



module.exports = router;