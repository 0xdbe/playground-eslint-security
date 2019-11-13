var validateEmailFormat = function( string ) {
  // eslint-disable-next-line no-useless-escape
  var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailExpression.test( string );
}

let start = 0;

start = process.hrtime();
console.log(validateEmailFormat("name@example.net"));
console.log(process.hrtime(start));

start = process.hrtime();
console.log(validateEmailFormat("jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.5555555555555555555555555555555555555555{"));
console.log(process.hrtime(start));

start = process.hrtime();
console.log(validateEmailFormat("jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.55555555555555555555555555555555555555555{"));
console.log(process.hrtime(start));

start = process.hrtime();
console.log(validateEmailFormat("jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.555555555555555555555555555555555555555555555555555555{"));
console.log(process.hrtime(start));

