const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("select * from Log_empresa", (err, rows) => {
            if(err){
                next(err);
            }
            const resultSQL = null;
            console.log(rows);
            res.render("index.html", {resultSQL});
        });
    });
};

module.exports = controller;

// const resultSQL = null;
//     res.render("index.html", {resultSQL});