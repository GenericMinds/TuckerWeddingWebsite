var sql = require("mssql");
import { ToastModel } from '../_models/ToastModel';

const config = {
    server     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : parseInt(process.env.RDS_PORT),
    database: 'TuckerWeddingWebsite'
}

export async function get(req, res): Promise<void> {
    let toasts: ToastModel[];
    
    sql.connect(config, function(err) {
        if (err) { throw err; }
        
        var request = new sql.Request();
        request.query('select * from Toast', function(err, recordset) {
            if(err) { throw err; }
            
            toasts = recordset.recordset;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(toasts));
        })
    });
}

export async function post(req, res): Promise<void> { 
    sql.connect(config, function(err) {
        if (err) { throw err; }
        
        var request = new sql.Request();
        request.input('toasterName', sql.VarChar(50), req.body.toast.toasterName);
        request.input('toasterRelationship', sql.VarChar(15), req.body.toast.toasterRelationship);
        request.input('toasterAssociation', sql.VarChar(5), req.body.toast.toasterAssociation);
        request.input('toastContent', sql.VarChar(sql.MAX), req.body.toast.toastContent);

        request.query("insert into Toast (toasterName, toasterRelationship, toasterAssociation, toastContent) VALUES (@toasterName, @toasterRelationship, @toasterAssociation, @toastContent);", function(err, recordset) {
            if(err) { throw err; }
            res.end(JSON.stringify(recordset));
        })
    });
}