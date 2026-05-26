const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post("/signup", async (req, res) => {

  const { name, mobile } = req.body;

  if(!name || !mobile){
    return res.json({
      success:false,
      message:"All fields required"
    });
  }

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        mobile
      }
    ]);

  if(error){
    return res.json({
      success:false,
      message:error.message
    });
  }

  res.json({
    success:true,
    data
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
