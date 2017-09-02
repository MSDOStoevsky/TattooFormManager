/*
 * Dylan Lettinga
 * 09/01/2017
 */
module.exports = {
    is_valid: (obj) => {
        if (obj) {
            if(
                !(typeof obj.first_name === "string")
                || !(typeof obj.last_name === "string")
                || !(typeof obj.full_name === "string")
                || !(typeof obj.age === "number")
                || !(typeof obj.is_minor === "boolean")
                || !(typeof obj.addr_l1 === "string")
                || !(typeof obj.addr_l2 === "string")
                || !(typeof obj.addr_city === "string")
                || !(typeof obj.addr_state === "string")
                || !(typeof obj.zip === "number")
                || !(typeof obj.phone_number === "string")
                || !(typeof obj.email === "string")
                || !(typeof obj.tat_descr === "string")
                || !(typeof obj.tat_compl === "string")
                || !(typeof obj.comp_haem === "boolean")
                || !(typeof obj.comp_skin === "boolean")
                || !(typeof obj.comp_allerg === "boolean")
                || !(typeof obj.comp_seiz === "boolean")
                || !(typeof obj.comp_clot === "boolean")
                || !(typeof obj.comp_preg === "boolean")
                || !(typeof obj.comp_other === "boolean")
                || !(typeof obj.tech_name === "string")
                || !(typeof obj.consent === "boolean")
                || !(typeof obj.date === "string")
                || !(new RegExp(".+@.+\\..+", "i").test(obj.email))
                || !(new RegExp("[0-9]{2}-[0-9]{2}-[0-9]{4}").test(obj.date))
            ) return false;
            else return true;
        }
    }
}