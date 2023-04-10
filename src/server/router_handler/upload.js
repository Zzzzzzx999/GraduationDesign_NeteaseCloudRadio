exports.addUpLoad = (req,res)=>{
    console.log(req.filename);
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.filename}`;
    res.send(imageUrl);
}