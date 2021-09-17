from flask import Flask, request, jsonify, render_template
import sqlite3 as sqlite
import sys
import os
app = Flask(__name__)

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
    
@app.route('/', methods=['GET'])
def home():
    return """<h1>Financial Business</h1>
    <p>A prototype API for loan money</p>
    """

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Get all User
@app.route('/api/v1/resources/get/all/user', methods=['GET'])
def api_get_all_user():
    conn = sqlite.connect('./data/database.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_users = cur.execute("SELECT * FROM User;").fetchall()
    return jsonify(all_users)

if __name__ == '__main__':
    if os.environ.get('PORT') is not None:
        app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT'))
    else:
        app.run(debug=True, host='0.0.0.0') 