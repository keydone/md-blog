const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const schema = {
    data: Object,
    updatedAt: {
        default: new Date(),
        expires: 86400 * 2, // 2 day
        type: Date,
    }
};

class MongooseStore {
    constructor({
        name = 'Session'
    } = {}) {
        this.SessionModel = mongoose.model(name, new Schema({
            _id: {
                type: String,
                default: ObjectId,
            },
            ...schema,
        }, { timestamps: true }));

        this.init();
    }

    async init() {
        this.session = await new this.SessionModel().save();
    }

    async destroy(id) {
        const { SessionModel } = this;
        return SessionModel.remove({ _id: id });
    }

    async get(id) {
        const { SessionModel } = this;
        const result = await SessionModel.findById(id);
        return result ? result.data : '';
    }

    async set(id, data, maxAge, { changed, rolling }) {
        if (changed || rolling) {
            const { SessionModel } = this;
            const record = { _id: id, data, updatedAt: new Date() };
            await SessionModel.findByIdAndUpdate(id, record, {
                upsert: true,
                useFindAndModify: false,
            });
        }
        return data;
    }

    static create(opts) {
        return new MongooseStore(opts);
    }
}

module.exports = MongooseStore;
