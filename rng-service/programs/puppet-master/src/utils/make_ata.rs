use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke};

pub fn make_ata<'a>(
    ata: AccountInfo<'a>,
    wallet: AccountInfo<'a>,
    mint: AccountInfo<'a>,
    fee_payer: &Signer<'a>,
    ata_program: AccountInfo<'a>,
    token_program: AccountInfo<'a>,
    system_program: AccountInfo<'a>,
    rent: AccountInfo<'a>,
    fee_payer_seeds: &[&[u8]],
) -> ProgramResult {
    let seeds: &[&[&[u8]]];
    let as_arr = [fee_payer_seeds];

    if fee_payer_seeds.len() > 0 {
        seeds = &as_arr;
    } else {
        seeds = &[];
    }
    invoke(
        &spl_associated_token_account::create_associated_token_account(
            &fee_payer.key(),
            &wallet.key,
            &mint.key,
        ),
        &[
            ata,
            wallet,
            mint,
            fee_payer.to_account_info(),
            ata_program,
            system_program,
            rent,
            token_program,
        ],
      //  seeds,
    )?;

    Ok(())
}
