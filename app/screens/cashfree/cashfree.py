from bottle import route, run, template

@route('/hello/<name>')
def index(name):
    return template('cashfree.html')

run(host='localhost', port=8080)